package com.bankofapis.account.controller;

import com.bankofapis.account.client.UserClient;
import com.bankofapis.account.dto.UserDTO;
import com.bankofapis.account.model.Account;
import com.bankofapis.account.service.AccountService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    private final AccountService accountService;
    private final UserClient userClient;

    public AccountController(AccountService accountService, UserClient userClient) {
        this.accountService = accountService;
        this.userClient = userClient;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO userDTO = userClient.getUserByUsername(username);
        Integer userId = userDTO.getUserId();

        logger.info("Fetching all accounts for userId={}", userId);

        List<Account> accounts = accountService.getAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable Integer id) {
        // Allows any authenticated user to view account info by ID
        logger.info("Account info requested for account id {}", id);

        Account account = accountService.getAccountById(id);
        if (account == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(account);
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO userDTO = userClient.getUserByUsername(username);
        Integer userId = userDTO.getUserId();

        account.setUserId(userId);
        Account createdAccount = accountService.createAccount(account);

        logger.info("Created account id {} for userId {}", createdAccount.getAccountId(), userId);
        return ResponseEntity.ok(createdAccount);
    }

    // Strict ownership check for debit (source account)
    @PutMapping("/{id}/debit")
    public ResponseEntity<?> debitAccount(@PathVariable Integer id, @RequestParam Double amount) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO userDTO = userClient.getUserByUsername(username);
        Integer userId = userDTO.getUserId();

        Account account = accountService.getAccountById(id);
        if (!account.getUserId().equals(userId)) {
            logger.warn("User {} unauthorized to debit account {}", userId, id);
            return ResponseEntity.status(403).body("Forbidden: You cannot debit this account.");
        }

        if (account.getAccountBalance() < amount) {
            return ResponseEntity.badRequest().body("Insufficient funds.");
        }

        double newBalance = account.getAccountBalance() - amount;
        Account updatedAccount = accountService.updateBalance(id, newBalance);

        logger.info("Debited {} from account {}, new balance {}", amount, id, newBalance);
        return ResponseEntity.ok(updatedAccount);
    }

    // Internal credit API: no ownership check, secured via network or other means
    @PutMapping("/{id}/credit")
    public ResponseEntity<?> creditAccount(@PathVariable Integer id, @RequestParam Double amount) {
        Account account = accountService.getAccountById(id);

        double newBalance = account.getAccountBalance() + amount;
        Account updatedAccount = accountService.updateBalance(id, newBalance);

        logger.info("Credited {} to account {}, new balance {}", amount, id, newBalance);
        return ResponseEntity.ok(updatedAccount);
    }
}
