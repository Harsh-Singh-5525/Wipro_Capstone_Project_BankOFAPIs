package com.bankofapis.transaction.repository;

import com.bankofapis.transaction.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByUserId(Integer userId);

}
