package com.bankofapis.transaction.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    private String transactionType;   // e.g. Deposit, Withdrawal, Transfer
    private Double amount;
    private LocalDateTime dateTransaction = LocalDateTime.now();

    private Integer fromAccountId;
    private Integer toAccountId;
    private Integer userId;

    // Getters and Setters
    public Integer getTransactionId() { return transactionId; }
    public void setTransactionId(Integer transactionId) { this.transactionId = transactionId; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDateTime getDateTransaction() { return dateTransaction; }
    public void setDateTransaction(LocalDateTime dateTransaction) { this.dateTransaction = dateTransaction; }

    public Integer getFromAccountId() { return fromAccountId; }
    public void setFromAccountId(Integer fromAccountId) { this.fromAccountId = fromAccountId; }

    public Integer getToAccountId() { return toAccountId; }
    public void setToAccountId(Integer toAccountId) { this.toAccountId = toAccountId; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
}
