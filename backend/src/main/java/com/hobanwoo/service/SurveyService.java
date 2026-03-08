package com.hobanwoo.service;

import com.hobanwoo.dto.AnswerDto;
import com.hobanwoo.dto.ResponseQuestion;
import com.hobanwoo.dto.SurveyResultResponse;
import com.hobanwoo.entity.Question;
import com.hobanwoo.entity.QuestionType;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hobanwoo.repository.QuestionRepository;

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

    // (이전에 통계 기능 넣으셨다면 @Transactional 유지!)
    public SurveyResultResponse calculateResult(List<AnswerDto> answers) { // 🌟 파라미터 변경!

        // 1. 점수판 준비
        int eScore = 0, iScore = 0;
        int sScore = 0, nScore = 0;
        int tScore = 0, fScore = 0;
        int jScore = 0, pScore = 0;

        // 2. 사용자의 답변을 하나씩 확인하며 채점
        for (AnswerDto answer : answers) { // 🌟 꺼낼 필요 없이 바로 List로 반복!
            Question question = questionRepository.findById(answer.getQuestionId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 질문입니다."));

            QuestionType type = question.getCategory();
            String pick = answer.getAnswer(); // 🌟 변수명을 answer로 바꿨으니 getAnswer()로 꺼냅니다!

            // 🚨 안전망: null 방지 + 공백 제거 + 대소문자 무시하고 "A"인지 확인
            boolean isA = (pick != null && pick.trim().equalsIgnoreCase("A"));

            // 확인용 로그 (잘 들어오는지 궁금할 때 보세요)
            System.out.println("질문 번호: " + answer.getQuestionId() + " / 처리된 답변: [" + pick + "]");

            switch (type) {
                case EI:
                    if (isA) eScore++; else iScore++;
                    break;
                case SN:
                    if (isA) sScore++; else nScore++;
                    break;
                case TF:
                    if (isA) tScore++; else fScore++;
                    break;
                case JP:
                    if (isA) jScore++; else pScore++;
                    break;
            }
        }

        // 3. 최종 MBTI 알파벳 조합하기
        StringBuilder mbtiBuilder = new StringBuilder();
        mbtiBuilder.append(eScore >= iScore ? "E" : "I");
        mbtiBuilder.append(sScore >= nScore ? "S" : "N");
        mbtiBuilder.append(tScore >= fScore ? "T" : "F");
        mbtiBuilder.append(jScore >= pScore ? "J" : "P");

        String finalMbti = mbtiBuilder.toString();

        System.out.println("계산된 최종 MBTI: " + finalMbti);

        // (선택) 아까 통계 기능 updateStats(finalMbti); 를 만드셨다면 여기에서 호출!
        // updateStats(finalMbti);

        // 4. MBTI에 맞는 호반우 결과 데이터 반환
        return createResultResponse(finalMbti);
    }


    private SurveyResultResponse createResultResponse(String mbti) {
        switch (mbti) {
            case "ESTJ":
                return SurveyResultResponse.builder()
                        .resultType("학생회장우")
                        .description("\"나를 따르라우! A+로 이끌어주겠우.\"")
                        .image("🐮")
                        .details(List.of("술자리·학점·리더십 다 잡은 완벽주의 갓생러"))
                        .build();
            case "ESTP":
                return SurveyResultResponse.builder()
                        .resultType("치타는웃고있우")
                        .description("\"놀 거 다 놀고 시험 전날만 새면 되우.\"")
                        .image("🐮")
                        .details(List.of("1시간 공부하고 B+ 받는 효율 끝판왕"))
                        .build();
            case "ESFJ":
                return SurveyResultResponse.builder()
                        .resultType("투뿔우")
                        .description("\"족보 구해놨으니까 동기방에 공유하겠우!\"")
                        .image("🐮")
                        .details(List.of("동기들 챙기며 성적도 잘 받는 엄마/아빠 같은 존재"))
                        .build();
            case "ESFP":
                return SurveyResultResponse.builder()
                        .resultType("럭키카우")
                        .description("\"망했다 생각했는데 B+ 나왔우.. 교수님 사랑해우.\"")
                        .image("🐮")
                        .details(List.of("노는 게 제일 좋지만 운 좋게 학점 선방하는 타입"))
                        .build();
            case "ENTJ":
                return SurveyResultResponse.builder()
                        .resultType("야망있우")
                        .description("\"이번 축제 라인업이랑 동선은 내가 짰우.\"")
                        .image("🐮")
                        .details(List.of("노는 판도 체계적으로 짜는 야망 있는 기획자"))
                        .build();
            case "ENTP":
                return SurveyResultResponse.builder()
                        .resultType("내말이다맞우")
                        .description("\"아니 그건 논리적으로 말이 안 되우! 한 잔 받으라우.\"")
                        .image("🐮")
                        .details(List.of("술자리에서 밤새 말싸움(토론)하는 논리왕"))
                        .build();
            case "ENFJ":
                return SurveyResultResponse.builder()
                        .resultType("우리는모두친우")
                        .description("\"센팍에서 돗자리 깔고 엽떡 먹자우.\"")
                        .image("🐮")
                        .details(List.of("북문 술집 사장님과 형·동생 하는 인맥 부자"))
                        .build();
            case "ENFP":
                return SurveyResultResponse.builder()
                        .resultType("오늘만살우")
                        .description("\"학점은 재수강하면 되지만 추억은 영원하우!\"")
                        .image("🐮")
                        .details(List.of("\"한 잔 더?\" 하면 바로 콜, 즉흥의 화신"))
                        .build();
            case "ISTJ":
                return SurveyResultResponse.builder()
                        .resultType("중앙도서 관우")
                        .description("\"시험 기간엔 말 걸지 말아주우. 예민하우.\"")
                        .image("🐮")
                        .details(List.of("중앙도서관 지정석 보유, 성실함의 인간화"))
                        .build();
            case "ISTP":
                return SurveyResultResponse.builder()
                        .resultType("출석업고튀우")
                        .description("\"출석 점수 계산해보니 한 번 더 빠져도 A 가능하우.\"")
                        .image("🐮")
                        .details(List.of("최소한의 노력으로 최대한의 학점을 뽑아냄"))
                        .build();
            case "ISFJ":
                return SurveyResultResponse.builder()
                        .resultType("전액장학우")
                        .description("\"이번 학기도 전액 장학금은 내 거우.\"")
                        .image("🐮")
                        .details(List.of("조용히 뒤에서 할 일 다 하고 장학금 타감"))
                        .build();
            case "ISFP":
                return SurveyResultResponse.builder()
                        .resultType("뒷공부우~")
                        .description("\"제출 마감 1분 전에 냈우! 심장 쫄깃하우.\"")
                        .image("🐮")
                        .details(List.of("뒤에서 몰래 공부 할 거 다 하는 집콕러"))
                        .build();
            case "INTJ":
                return SurveyResultResponse.builder()
                        .resultType("공강이제일좋우")
                        .description("\"공강 시간에는 PC방/카페 성지순례 가야 하우.\"")
                        .image("🐮")
                        .details(List.of("학업보다 내 취미 분석에 진심인 계획적 덕후"))
                        .build();
            case "INTP":
                return SurveyResultResponse.builder()
                        .resultType("일청담에서살우")
                        .description("\"학점이란 무엇일까.. 인생 무상 아니겠우?\"")
                        .image("🐮")
                        .details(List.of("일청담 벤치에서 멍 때리며 우주의 이치를 고민함"))
                        .build();
            case "INFJ":
                return SurveyResultResponse.builder()
                        .resultType("감성브이록우")
                        .description("\"오늘 날씨가 너무 좋아서 자체 휴강하겠우.\"")
                        .image("🐮")
                        .details(List.of("혼자 예쁜 카페 가고 다이어리 꾸미는 감성파"))
                        .build();
            case "INFP":
                return SurveyResultResponse.builder()
                        .resultType("이불밖은싫우")
                        .description("\"오늘은 비 오니까 그냥 줌(Zoom)으로 듣고 싶우...\"")
                        .image("🐮")
                        .details(List.of("학교 가는 것 자체가 도전! 침대와 물아일체"))
                        .build();
            default:
                return SurveyResultResponse.builder()
                        .resultType("줏대 있는 마이웨이 호반우 (" + mbti + ")")
                        .description("\"당신만의 독특한 매력이 빛나는 캠퍼스 라이프!\"")
                        .image("🐮😎")
                        .details(List.of("알 수 없는 매력의 소유자"))
                        .build();
        }
    }



}
