export const questions = [
  {
    id: 1,
    question: "개강총회 날이다.\n 가야 할까?",
    options: [
      { text: "무조건 필참! \n 술자리에서 동기들이랑 친해져야지.", type: "E" },
      {
        text: "귀찮은데... \n 빠질 구실을 찾는다.",
        type: "I",
      },
    ],
  },
  {
    id: 2,
    question: "시간이 3시간 붕 떴다! \n 공강 시간 활용법은?",
    options: [
      { text: "과방이나 동아리방으로 간다. \n누구든 있겠지!", type: "E" },
      {
        text: "도서관이나 조용한 카페로 간다. \n혼자만의 시간 소중해.",
        type: "I",
      },
    ],
  },
  {
    id: 3,
    question: "캠퍼스를 걷다 저 멀리 \n아는 동기가 보인다.",
    options: [
      { text: "크게 부르며 반갑게 달려간다.", type: "E" },
      { text: "못 본 척 자연스럽게 지나간다.", type: "I" },
    ],
  },
  {
    id: 4,
    question: "수강신청 1분 전! \n수강 꾸러미에 담은 \n1순위 강의는?",
    options: [
      { text: "'꿀강'이라 소문난 강의. \n학점 잘 주는 게 최고지.", type: "S" },
      {
        text: "평소 관심 있던 주제의 강의. \n학점 받긴 힘들어도 재밌어 보여!",
        type: "N",
      },
    ],
  },
  {
    id: 5,
    question: "강의 시간 교수님이\n 농담을 하신다면?",
    options: [
      { text: "'이건 시험에 안 나오겠네.' \n펜을 잠시 내려놓는다.", type: "S" },
      { text: "'오.. 흥미로운데?' 집중하며 듣는다.", type: "N" },
    ],
  },
  {
    id: 6,
    question: "내가 생각하는 \n진정한 대학 생활의 \n로망은?",
    options: [
      {
        text: "빵빵한 학점과 스펙으로 \n 대기업 취업 성공.",
        type: "S",
      },
      {
        text: "일청담 잔디밭에서 낮술, \n CC.. 낭만적인 청춘 드라마.",
        type: "N",
      },
    ],
  },
  {
    id: 7,
    question: "조별 과제 중, \n 조원이 아파서 \n자료 조사를 \n못 했다고 한다.",
    options: [
      { text: "아.. 많이 아프세요? 일단 쉬세요.", type: "T" },
      { text: "헐 어떡해요 병원은 가보셨어요?", type: "F" },
    ],
  },
  {
    id: 8,
    question: "친구가 \n'나 이번 시험 망쳤어..'\n라고 카톡을 보냈다.",
    options: [
      { text: "무슨 과목인데? ", type: "T" },
      { text: "술 한잔하러 갈래? ", type: "F" },
    ],
  },
  {
    id: 9,
    question: "팀플 발표 준비 중, \n의견 충돌이 생겼다.",
    options: [
      {
        text: "내 의견을 밀어 붙인다.",
        type: "T",
      },
      {
        text: "적당히 웃으며 중재한다.",
        type: "F",
      },
    ],
  },
  {
    id: 10,
    question: "시험 기간이 \n 벌써 2주 앞으로?",
    options: [
      {
        text: "이미 강의별 \n공부 계획표대로 진행 중.",
        type: "J",
      },
      { text: "아직 2주나 남았네?\n 넷플릭스를 켠다.", type: "P" },
    ],
  },
  {
    id: 11,
    question: "과제 제출 마감이 \n 내일 아침 9시까지라면?",
    options: [
      { text: "이미 제출하고 꿀잠 자는 중이다.", type: "J" },
      {
        text: "새벽 4시, 밤샘 과제 중이다.",
        type: "P",
      },
    ],
  },
  {
    id: 12,
    question: "방학 때 동기들과 \n 여행을 가기로 했다.",
    options: [
      { text: "맛집, 교통편을 싹 정리한다.", type: "J" },
      { text: "일단 기차표만 끊어! 가서 생각하자.", type: "P" },
    ],
  },
];

// 결과 타입 (나중에 실제 데이터로 교체)
export const results = {
  introvert: {
    type: "내성적인 호반우",
    description: "혼자만의 시간을 즐기는 당신!",
  },
  extrovert: {
    type: "인싸 호반우",
    description: "사람들과 함께하는 게 최고!",
  },
  overachiever: {
    type: "과대호반우",
    description: "열정 넘치는 리더형!",
  },
  researcher: {
    type: "대학원호반우",
    description: "학문에 진심인 당신!",
  },
};
