package com.hobanwoo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SharedResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 외부 공유용 13자리 시간 난수 (중복 불가)
    @Column(unique = true, nullable = false)
    private String shareCode;

    // 이 난수를 가진 사람의 실제 결과 (예: "INFP", "A형" 등)
    @Column(nullable = false)
    private String resultType;

    public SharedResult(String shareCode, String resultType) {
        this.shareCode = shareCode;
        this.resultType = resultType;
    }
}
