package com.bankofapis.transaction.client;

import com.bankofapis.transaction.dto.AccountDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "account-service")
public interface AccountClient {

    @GetMapping("/api/accounts/{id}")
    AccountDTO getAccount(@PathVariable("id") Integer id);

    @PutMapping("/api/accounts/{id}/debit")
    AccountDTO debitAccount(@PathVariable("id") Integer id, @RequestParam Double amount);

    @PutMapping("/api/accounts/{id}/credit")
    AccountDTO creditAccount(@PathVariable("id") Integer id, @RequestParam Double amount);
}
