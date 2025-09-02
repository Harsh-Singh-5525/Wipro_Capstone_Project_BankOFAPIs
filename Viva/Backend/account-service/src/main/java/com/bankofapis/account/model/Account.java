package com.bankofapis.account.model;

import jakarta.persistence.*;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    private String accountType;
    private Double accountBalance;
    private String secretPassword;
    private Integer userId; // FK from User service

    @ManyToOne
    @JoinColumn(name = "bank_id") // Foreign key column in Account table
    private Bank bank; // Reference to Bank entity

    // getters and setters
    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public Double getAccountBalance() { return accountBalance; }
    public void setAccountBalance(Double accountBalance) { this.accountBalance = accountBalance; }

    public String getSecretPassword() { return secretPassword; }
    public void setSecretPassword(String secretPassword) { this.secretPassword = secretPassword; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Bank getBank() { return bank; }
    public void setBank(Bank bank) { this.bank = bank; }
}
