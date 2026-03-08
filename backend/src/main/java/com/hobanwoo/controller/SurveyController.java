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
    public ResponseEntity<SurveyResultResponse> submitSurvey(@RequestBody List<AnswerDto> answers) {

        // 1. 서비스 내부에서 결과 계산 + 통계 업데이트 + 난수 생성까지 한 번에 처리됨
        SurveyResultResponse realResult = surveyService.calculateResult(answers);

        // 2. 통계 업데이트 (서비스 내부 호출로 옮기지 않았다면 여기서 유지)
        surveyService.updateStats(realResult.getResultType());

        // 3. 이미 realResult 안에 shareCode가 들어있으므로, 맵을 따로 만들 필요 없이 바로 반환!
        return ResponseEntity.ok(realResult);
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
