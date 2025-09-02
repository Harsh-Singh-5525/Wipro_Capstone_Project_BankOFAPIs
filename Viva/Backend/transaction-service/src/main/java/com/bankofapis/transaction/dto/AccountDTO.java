package com.bankofapis.transaction.dto;

public class AccountDTO {
    private Integer accountId;
    private String accountType;
    private Double accountBalance;
    private Integer userId;

    // Getters and Setters
    public Integer getAccountId() { return accountId; }
    public void setAccountId(Integer accountId) { this.accountId = accountId; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public Double getAccountBalance() { return accountBalance; }
    public void setAccountBalance(Double accountBalance) { this.accountBalance = accountBalance; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
}
