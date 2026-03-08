package com.hobanwoo.dto;

import lombok.Data;

@Data
public class AnswerDto {
    private Long questionId;
    private String answer; // "A" 또는 "B"
}
