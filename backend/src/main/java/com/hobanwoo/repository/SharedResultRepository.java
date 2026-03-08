package com.hobanwoo.repository;

import com.hobanwoo.entity.SharedResult;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedResultRepository extends JpaRepository<SharedResult, Long> {
    Optional<SharedResult> findByShareCode(String shareCode);
}
