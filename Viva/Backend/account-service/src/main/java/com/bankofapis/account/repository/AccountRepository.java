package com.bankofapis.account.repository;

import com.bankofapis.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findByUserId(Integer userId);
}
