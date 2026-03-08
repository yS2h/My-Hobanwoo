package com.hobanwoo.repository;

import com.hobanwoo.entity.MbtiStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MbtiStatRepository extends JpaRepository<MbtiStat, String> {
    @Modifying(clearAutomatically = true)
    @Query("UPDATE MbtiStat m SET m.count = m.count + 1 WHERE m.mbti = :mbti")
    int incrementCount(@Param("mbti") String mbti);

    @Query("SELECT COALESCE(SUM(m.count), 0) FROM MbtiStat m")
    Long getTotalParticipantCount();
}
