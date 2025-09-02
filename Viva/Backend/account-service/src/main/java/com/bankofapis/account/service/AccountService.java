package com.bankofapis.account.service;

import com.bankofapis.account.model.Account;
import com.bankofapis.account.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public List<Account> getAccountsByUserId(Integer userId) {
        return accountRepository.findByUserId(userId);
    }

    public Account getAccountById(Integer id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public Account createAccount(Account account) {
        String encodedPassword = passwordEncoder.encode(account.getSecretPassword());
        account.setSecretPassword(encodedPassword);
        return accountRepository.save(account);
    }

    public Account updateBalance(Integer id, Double newBalance) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        account.setAccountBalance(newBalance);
        return accountRepository.save(account);
    }
}
