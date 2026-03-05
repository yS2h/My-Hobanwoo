export const questions = [
  {
    id: 1,
    question: "약속이 취소되면 속으로 기쁘다",
    type: "OX"
  },
  {
    id: 2,
    question: "혼자 밥 먹는 것이 편하다",
    type: "OX"
  },
  {
    id: 3,
    question: "주말에는 집에서 쉬고 싶다",
    type: "OX"
  },
  {
    id: 4,
    question: "단체 과제보다 개인 과제가 좋다",
    type: "OX"
  },
  {
    id: 5,
    question: "MT는 가고 싶지 않다",
    type: "OX"
  },
  {
    id: 6,
    question: "과 대표 같은 건 절대 하기 싫다",
    type: "OX"
  },
  {
    id: 7,
    question: "도서관이 술집보다 편하다",
    type: "OX"
  },
  {
    id: 8,
    question: "새로운 사람 만나는 게 피곤하다",
    type: "OX"
  },
  {
    id: 9,
    question: "연락 안 오면 안 오는 게 좋다",
    type: "OX"
  },
  {
    id: 10,
    question: "학식보다 편의점이 낫다",
    type: "OX"
  }
];

// 결과 타입 (나중에 실제 데이터로 교체)
export const results = {
  introvert: {
    type: "내성적인 호반우",
    description: "혼자만의 시간을 즐기는 당신!"
  },
  extrovert: {
    type: "인싸 호반우", 
    description: "사람들과 함께하는 게 최고!"
  },
  overachiever: {
    type: "과대호반우",
    description: "열정 넘치는 리더형!"
  },
  researcher: {
    type: "대학원호반우",
    description: "학문에 진심인 당신!"
  }
};