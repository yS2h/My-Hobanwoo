package com.hobanwoo.dto;

import java.util.List;
import lombok.Data;

@Data
public class SurveyResult {

    private List<AnswerDto> answers;

    @Data
    public static class AnswerDto {
        private Long questionId;
        private String pick; // "A" 또는 "B"
    }

}
