package com.bankofapis.transaction.controller;

import com.bankofapis.transaction.client.AccountClient;
import com.bankofapis.transaction.client.UserClient;
import com.bankofapis.transaction.dto.AccountDTO;
import com.bankofapis.transaction.model.Transaction;
import com.bankofapis.transaction.repository.TransactionRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

    private final TransactionRepository transactionRepository;
    private final AccountClient accountClient;
    private final UserClient userClient;

    public TransactionController(TransactionRepository transactionRepository,
                                 AccountClient accountClient,
                                 UserClient userClient) {
        this.transactionRepository = transactionRepository;
        this.accountClient = accountClient;
        this.userClient = userClient;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(Authentication authentication,
                                                                @RequestParam(required = false) Integer userId) {
        String username = authentication.getName();
        Integer currentUserId = fetchUserIdFromUsername(username);

        if (userId != null && !userId.equals(currentUserId)) {
            return ResponseEntity.status(403).build();
        }

        List<Transaction> transactions = transactionRepository.findByUserId(currentUserId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Integer id, Authentication authentication) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        String username = authentication.getName();
        Integer currentUserId = fetchUserIdFromUsername(username);

        if (!transaction.getUserId().equals(currentUserId)) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(transaction);
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction, Authentication authentication) {
        String username = authentication.getName();
        Integer currentUserId = fetchUserIdFromUsername(username);

        if (!transaction.getUserId().equals(currentUserId)) {
            return ResponseEntity.status(403).body("Unauthorized user for this transaction.");
        }

        logger.info("Starting transaction: userId={}, fromAccountId={}, toAccountId={}, amount={}",
                currentUserId, transaction.getFromAccountId(), transaction.getToAccountId(), transaction.getAmount());

        AccountDTO fromAccount = accountClient.getAccount(transaction.getFromAccountId());
        AccountDTO toAccount = accountClient.getAccount(transaction.getToAccountId());

        if (fromAccount == null || toAccount == null) {
            return ResponseEntity.badRequest().body("One or both accounts do not exist.");
        }

        try {
            // Debit source account
            AccountDTO debitedAccount = accountClient.debitAccount(transaction.getFromAccountId(), transaction.getAmount());
            if (debitedAccount == null) {
                return ResponseEntity.status(500).body("Failed to debit source account.");
            }

            // Credit target account
            AccountDTO creditedAccount = accountClient.creditAccount(transaction.getToAccountId(), transaction.getAmount());
            if (creditedAccount == null) {
                // Rollback debit
                accountClient.creditAccount(transaction.getFromAccountId(), transaction.getAmount());
                return ResponseEntity.status(500).body("Failed to credit target account. Rolled back debit.");
            }
        } catch (Exception e) {
            logger.error("Exception during balance update", e);
            return ResponseEntity.status(500).body("Error during balance update: " + e.getMessage());
        }

        Transaction created = transactionRepository.save(transaction);
        logger.info("Transaction successfully saved: id={}", created.getTransactionId());

        return ResponseEntity.ok(created);
    }

    private Integer fetchUserIdFromUsername(String username) {
        return userClient.getUserByUsername(username).getUserId();
    }
}
