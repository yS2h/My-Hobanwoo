package com.hobanwoo.dto;

import lombok.Data;

@Data
public class ResponseQuestion {
    private Long id;
    private String question;
    private String optionA;
    private String optionB;

    public ResponseQuestion (Long id, String content, String optionA, String optionB) {
        this.id = id;
        this.question = content;
        this.optionA = optionA;
        this.optionB = optionB;
    }

}
