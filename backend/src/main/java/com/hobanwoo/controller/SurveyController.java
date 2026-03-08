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
    public ResponseEntity<SurveyResultResponse> submitSurvey(@RequestBody SurveyResult surveyResult) {

        // 1. 프론트에서 넘어온 데이터 확인 (디버깅용)
        System.out.println("프론트에서 받은 데이터: " + surveyResult.getAnswers());

        // 2. 더미 데이터 삭제! 진짜 서비스 로직 호출해서 MBTI 계산!
        SurveyResultResponse realResult = surveyService.calculateResult(surveyResult);

        // 3. 계산된 찐 결과를 프론트엔드로 바로 쏴줍니다
        return ResponseEntity.ok(realResult);
    }

}
