package com.hobanwoo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MbtiStat {

    @Id // 이 부분이 DB의 PRIMARY KEY와 매핑됩니다.
    private String mbti;

    private Long count;

    public MbtiStat(String mbti, Long count) {
        this.mbti = mbti;
        this.count = count;
    }

    // 비즈니스 로직은 엔티티 안에 두는 것이 좋습니다. (객체지향)
    public void increment() {
        this.count++;
    }
}
