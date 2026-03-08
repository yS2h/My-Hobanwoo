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
    public ResponseEntity<SurveyResultResponse> submitSurvey(@RequestBody List<AnswerDto> answers) { // ⬅️ 여기!

        System.out.println("프론트에서 이름 없이 바로 받은 데이터: " + answers);

        // 서비스로 넘겨줄 때도 answers 리스트를 바로 넘겨줍니다.
        SurveyResultResponse realResult = surveyService.calculateResult(answers);


        surveyService.updateStats(realResult.getResultType());

        return ResponseEntity.ok(realResult);
    }

}
