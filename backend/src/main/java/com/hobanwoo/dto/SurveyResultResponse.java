package com.hobanwoo.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SurveyResultResponse {
    private String resultType;
    private String description;
    private String image;
    private List<String> details;
}
