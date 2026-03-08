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
    public ResponseEntity<Map<String, Object>> submitSurvey(@RequestBody List<AnswerDto> answers) {

        // 기존 결과 계산 및 통계 업데이트
        SurveyResultResponse realResult = surveyService.calculateResult(answers);
        surveyService.updateStats(realResult.getResultType());

        // ✨ 새로 만든 서비스 메서드로 시간 난수 생성 & 저장 ✨
        String shareCode = surveyService.createShareCode(realResult.getResultType());

        // 결과 데이터와 shareCode를 묶어서 보냅니다.
        Map<String, Object> response = new HashMap<>();
        response.put("result", realResult);
        response.put("shareCode", shareCode);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/result/{shareCode}")
    public ResponseEntity<Map<String, String>> getSharedResult(@PathVariable String shareCode) {

        // 서비스에서 난수로 결과 타입 찾아오기
        String resultType = surveyService.getSharedResultType(shareCode);

        Map<String, String> response = new HashMap<>();
        response.put("resultType", resultType);

        return ResponseEntity.ok(response);
    }

}
