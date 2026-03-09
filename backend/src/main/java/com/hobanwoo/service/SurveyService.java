package com.hobanwoo.service;

import com.hobanwoo.dto.AnswerDto;
import com.hobanwoo.dto.ResponseQuestion;
import com.hobanwoo.dto.SurveyResultResponse;
import com.hobanwoo.entity.Question;
import com.hobanwoo.entity.QuestionType;
import com.hobanwoo.entity.SharedResult;
import com.hobanwoo.repository.MbtiStatRepository;
import com.hobanwoo.repository.QuestionRepository;
import com.hobanwoo.repository.SharedResultRepository;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyService {

    private final QuestionRepository questionRepository;
    private final MbtiStatRepository mbtiStatRepository;
    private final SharedResultRepository sharedResultRepository;

    @Transactional
    public void updateStats(String mbti) {
        // 이미 DB에 'ENTJ' 같은 데이터가 0인 상태로 존재하므로,
        // 조회 없이 바로 +1 업데이트를 날립니다.
        int result = mbtiStatRepository.incrementCount(mbti);

        // (선택사항) 만약 잘못된 MBTI 값이 들어와서 업데이트된 행이 없다면 예외 처리
        if (result == 0) {
            throw new IllegalArgumentException("존재하지 않는 MBTI 타입입니다: " + mbti);
        }
    }

    @Transactional(readOnly = true)
    public Long getTotalParticipants() {
        return mbtiStatRepository.getTotalParticipantCount();
    }

    // 1. 질문지 15개 랜덤으로 가져오기
    @Transactional(readOnly = true)
    public List<ResponseQuestion> getSurveyQuestions() {
        List<Question> questions = questionRepository.findAll();
        Collections.shuffle(questions);

        return questions.stream()
                .map(q -> new ResponseQuestion(
                        q.getId(),
                        q.getQuestion(),
                        q.getOption_A(),
                        q.getOption_B()
                ))
                .collect(Collectors.toList());
    }

    // 2. 답변 채점 및 MBTI 도출
    @Transactional
    public String calculateResult(List<AnswerDto> answers) {

        // [수정 2] DB 단건 조회 15번 -> IN 쿼리로 1번만 조회하도록 최적화
        List<Long> questionIds = answers.stream()
                .map(AnswerDto::getQuestionId)
                .collect(Collectors.toList());

        // ID를 키로, Question 객체를 값으로 가지는 Map 생성 (빠른 매칭을 위해)
        Map<Long, Question> questionMap = questionRepository.findAllById(questionIds).stream()
                .collect(Collectors.toMap(Question::getId, Function.identity()));

        int eScore = 0, iScore = 0;
        int sScore = 0, nScore = 0;
        int tScore = 0, fScore = 0;
        int jScore = 0, pScore = 0;

        for (AnswerDto answer : answers) {
            Question question = questionMap.get(answer.getQuestionId());
            if (question == null) {
                throw new IllegalArgumentException("존재하지 않는 질문입니다: " + answer.getQuestionId());
            }

            QuestionType type = question.getCategory();
            String pick = answer.getAnswer();
            boolean isA = (pick != null && pick.trim().equalsIgnoreCase("A"));

            switch (type) {
                case EI: if (isA) eScore++; else iScore++; break;
                case SN: if (isA) sScore++; else nScore++; break;
                case TF: if (isA) tScore++; else fScore++; break;
                case JP: if (isA) jScore++; else pScore++; break;
            }
        }

        String finalMbti = String.format("%s%s%s%s",
                eScore >= iScore ? "E" : "I",
                sScore >= nScore ? "S" : "N",
                tScore >= fScore ? "T" : "F",
                jScore >= pScore ? "J" : "P"
        );

        // 결과 저장 및 통계 업데이트
        return createShareCode(finalMbti);
    }

    // 3. MBTI 결과 데이터 매핑
    public SurveyResultResponse createResultResponse(String mbti,double percentage) {

        switch (mbti) {
            case "ESTJ":
                return SurveyResultResponse.builder()
                        .resultType("학생회장우")
                        .description("\"나를 따르라우! A+로 이끌어주겠우.\"")
                        .image("/images/ESTJ.png")
                        .percentage(percentage)
                        .build();
            case "ESTP":
                return SurveyResultResponse.builder()
                        .resultType("치타는웃고있우")
                        .description("\"놀 거 다 놀고 시험 전날만 새면 되우.\"")
                        .image("/images/ESTP.png")
                        .percentage(percentage)
                        .build();
            case "ESFJ":
                return SurveyResultResponse.builder()
                        .resultType("투뿔우")
                        .description("\"족보 구해놨으니까 동기방에 공유하겠우!\"")
                        .image("/images/ESFJ.png")
                        .percentage(percentage)
                        .build();
            case "ESFP":
                return SurveyResultResponse.builder()
                        .resultType("럭키카우")
                        .description("\"망했다 생각했는데 B+ 나왔우.. 교수님 사랑해우.\"")
                        .image("/images/ESFP.png")
                        .percentage(percentage)
                        .build();
            case "ENTJ":
                return SurveyResultResponse.builder()
                        .resultType("야망있우")
                        .description("\"이번 축제 라인업이랑 동선은 내가 짰우.\"")
                        .image("/images/ENTJ.png")
                        .percentage(percentage)
                        .build();
            case "ENTP":
                return SurveyResultResponse.builder()
                        .resultType("내말이다맞우")
                        .description("\"아니 그건 논리적으로 말이 안 되우! 한 잔 받으라우.\"")
                        .image("/images/ENTP.png")
                        .percentage(percentage)
                        .build();
            case "ISFP":
                return SurveyResultResponse.builder()
                        .resultType("뒷공부우~")
                        .description("\"제출 마감 1분 전에 냈우! 심장 쫄깃하우.\"")
                        .image("/images/ISFP.png")
                        .percentage(percentage)
                        .build();
            case "ENFJ":
                return SurveyResultResponse.builder()
                        .resultType("우리는모두친우")
                        .description("\"센팍에서 돗자리 깔고 엽떡 먹자우.\"")
                        .image("/images/ENFJ.png")
                        .percentage(percentage)
                        .build();
            case "ENFP":
                return SurveyResultResponse.builder()
                        .resultType("오늘만살우")
                        .description("\"학점은 재수강하면 되지만 추억은 영원하우!\"")
                        .image("/images/ENFP.png")
                        .percentage(percentage)
                        .build();
            case "ISTJ":
                return SurveyResultResponse.builder()
                        .resultType("중앙도서 관우")
                        .description("\"시험 기간엔 말 걸지 말아주우. 예민하우.\"")
                        .image("/images/ISTJ.png")
                        .percentage(percentage)
                        .build();
            case "ISTP":
                return SurveyResultResponse.builder()
                        .resultType("출석업고튀우")
                        .description("\"출석 점수 계산해보니 한 번 더 빠져도 A 가능하우.\"")
                        .image("/images/ISTP.png")
                        .percentage(percentage)
                        .build();
            case "ISFJ":
                return SurveyResultResponse.builder()
                        .resultType("전액장학우")
                        .description("\"이번 학기도 전액 장학금은 내 거우.\"")
                        .image("/images/ISFJ.png")
                        .percentage(percentage)
                        .build();
            case "INTJ":
                return SurveyResultResponse.builder()
                        .resultType("공강이제일좋우")
                        .description("\"공강 시간에는 PC방/카페 성지순례 가야 하우.\"")
                        .image("/images/INTJ.png")
                        .percentage(percentage)
                        .build();
            case "INTP":
                return SurveyResultResponse.builder()
                        .resultType("일청담에서살우")
                        .description("\"학점이란 무엇일까.. 인생 무상 아니겠우?\"")
                        .image("/images/INTP.png")
                        .percentage(percentage)
                        .build();
            case "INFJ":
                return SurveyResultResponse.builder()
                        .resultType("감성브이록우")
                        .description("\"오늘 날씨가 너무 좋아서 자체 휴강하겠우.\"")
                        .image("/images/INFJ.png")
                        .percentage(percentage)
                        .build();
            case "INFP":
                return SurveyResultResponse.builder()
                        .resultType("이불밖은싫우")
                        .description("\"오늘은 비 오니까 그냥 줌(Zoom)으로 듣고 싶우...\"")
                        .image("/images/INFP.png")
                        .percentage(percentage)
                        .build();
            default:
                return SurveyResultResponse.builder()
                        .resultType("줏대 있는 마이웨이 호반우 (" + mbti + ")")
                        .description("\"당신만의 독특한 매력이 빛나는 캠퍼스 라이프!\"")
                        .image("/images/ESTJ.png")
                        .percentage(percentage)
                        .build();
        }
    }

    private String createShareCode(String resultType) {
        // [수정 3] 동시성 문제를 막기 위해 UUID 사용
        String shareCode = UUID.randomUUID().toString().substring(0, 13); // 필요에 따라 길이 조절

        SharedResult sharedResult = new SharedResult(shareCode, resultType);
        sharedResultRepository.save(sharedResult);

        updateStats(resultType);

        return shareCode;
    }

    // 2. 남들이 링크 눌렀을 때, 난수로 결과를 찾아주는 메서드
    @Transactional(readOnly = true)
    public SurveyResultResponse getSharedResultWithPercentage(String shareCode) {
// 1) 공유 코드로 MBTI 결과 찾기
        SharedResult sharedResult = sharedResultRepository.findByShareCode(shareCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않거나 잘못된 공유 링크입니다."));
        String mbti = sharedResult.getResultType();

        // 2) 퍼센테이지 계산 (Repository 활용)
        Long totalParticipants = mbtiStatRepository.getTotalParticipantCount();
        Long typeCount = mbtiStatRepository.getCountByMbti(mbti);

        // null 방어 및 0으로 나누기 방지
        long safeTotal = (totalParticipants != null) ? totalParticipants : 0L;
        long safeCount = (typeCount != null) ? typeCount : 0L;

        double percentage = 0.0;
        if (safeTotal > 0) {
            // (특정 유형 수 / 전체 수) * 100 한 뒤, 소수점 첫째 자리까지 반올림
            percentage = Math.round(((double) safeCount / safeTotal) * 1000) / 10.0;
        }

        // 3) DTO 조립 메서드로 넘기기
        return createResultResponse(mbti, percentage);
    }
}