package com.hobanwoo.controller;

import com.hobanwoo.dto.ApiResponse;
import com.hobanwoo.dto.ResponseQuestion;
import com.hobanwoo.dto.SurveyResult;
import com.hobanwoo.dto.SurveyResultResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.hobanwoo.service.SurveyService;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class SurveyController {
    private final SurveyService surveyService;


    @GetMapping("/survey")
    public ResponseEntity<List<ResponseQuestion>> getSurveyQuestions() {

        List<ResponseQuestion> questions = surveyService.getSurveyQuestions();
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submit")
    public ApiResponse<SurveyResultResponse> submitSurvey(@RequestBody SurveyResult surveyResult) { // 여기도 변경!

        // 1. 프론트에서 온 데이터 확인 (콘솔 출력)
        System.out.println("프론트에서 온 데이터: " + surveyResult.getAnswers());

        // 2. 가짜(Dummy) 데이터 응답
        SurveyResultResponse dummyResult = SurveyResultResponse.builder()
                .resultType("내성적인 호반우")
                .description("혼자만의 시간을 즐기는 당신! 조용한 카페에서 책 읽는 게 제일 행복해요.")
                .image("🐮")
                .details(List.of(
                        "사람 많은 곳보다 조용한 공간을 선호해요",
                        "혼자 있는 시간이 소중해요",
                        "깊은 대화를 나눌 수 있는 소수의 친구가 있어요"
                ))
                .build();

        // 3. 규격에 맞게 포장해서 반환
        return new ApiResponse<>(true, dummyResult);
    }
}
