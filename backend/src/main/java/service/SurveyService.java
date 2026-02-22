package service;

import dto.ResponseQuestion;
import entity.Question;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.QuestionRepository;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final QuestionRepository questionRepository;

    // 1. 질문지 15개 랜덤으로 가져오기
    @Transactional(readOnly = true)
    public List<ResponseQuestion> getSurveyQuestions() {
        // 모든 질문 가져오기
        List<Question> questions = questionRepository.findAll();

        // 랜덤으로 섞기 (셔플)
        Collections.shuffle(questions);

        // 프론트엔드에 보낼 DTO로 변환 (정답이나 유형 정보는 숨김)
        return questions.stream()
                .map(q -> new ResponseQuestion(
                        q.getId(),
                        q.getQuestion(),
                        q.getOptionA(),
                        q.getOptionB()
                ))
                .collect(Collectors.toList());
    }

}
