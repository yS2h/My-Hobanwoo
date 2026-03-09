package com.hobanwoo.controller;

import com.hobanwoo.dto.AnswerDto;
import com.hobanwoo.dto.ResponseQuestion;
import com.hobanwoo.dto.SurveyResultResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.hobanwoo.service.SurveyService;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getTotalCount() {

        Long total = surveyService.getTotalParticipants();

        // Map에 키값과 함께 담아서 보냅니다.
        Map<String, Long> response = new HashMap<>();
        response.put("totalParticipants", total);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/survey")
    public ResponseEntity<List<ResponseQuestion>> getSurveyQuestions() {

        List<ResponseQuestion> questions = surveyService.getSurveyQuestions();
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String,String>> submitSurvey(@RequestBody List<AnswerDto> answers) {
        String realResult = surveyService.calculateResult(answers);

        Map<String, String> response = new HashMap<>();
        response.put("shareCode", realResult);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/result/{shareCode}")
    public ResponseEntity<SurveyResultResponse> getSharedResult(@PathVariable String shareCode) {

        // Service에서 MBTI 조회 + 백분율 계산 + DTO 조립을 한 번에 처리해서 가져옵니다.
        SurveyResultResponse resultResponse = surveyService.getSharedResultWithPercentage(shareCode);

        return ResponseEntity.ok(resultResponse);
    }

}
