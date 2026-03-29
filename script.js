// 문제 데이터: 힌트와 정답을 배열로 저장
const quizData = [
  { hint: "ㅅㅇ ㅇㅌㅍㅇ", answer: "설악 워터피아" },
  { hint: "ㄹㄷ ㅇㄷㅂㅊ", answer: "롯데 어드벤처" },
  { hint: "ㅇㅂㄹㄷ", answer: "에버랜드" },
  { hint: "ㅅㅇㄹㄷ", answer: "서울랜드" },
  { hint: "ㅋㄹㅂㅂ", answer: "캐리비안베이" },
];

// 화면 요소 선택
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const hintText = document.getElementById("hintText");
const answerInput = document.getElementById("answerInput");
const submitButton = document.getElementById("submitButton");
const messageText = document.getElementById("messageText");
const restartButton = document.getElementById("restartButton");

let currentIndex = 0;
let score = 0;
let wrongAttempts = 0;

// 문자열 비교를 쉽게 하기 위해 공백 제거 + 소문자 변환
function normalizeText(text) {
  return text.replace(/\s+/g, "").toLowerCase();
}

// 현재 문제를 화면에 표시
function renderQuestion() {
  const currentQuiz = quizData[currentIndex];

  progressText.textContent = `문제 ${currentIndex + 1} / ${quizData.length}`;
  scoreText.textContent = `점수: ${score}`;
  hintText.textContent = currentQuiz.hint;

  answerInput.value = "";
  answerInput.focus();
  messageText.textContent = "";
  messageText.className = "message";
  wrongAttempts = 0;
}

// 퀴즈가 끝난 화면 표시
function showFinalResult() {
  progressText.textContent = `문제 ${quizData.length} / ${quizData.length}`;
  hintText.textContent = "퀴즈 완료!";
  messageText.textContent = `최종 점수: ${score} / ${quizData.length}`;
  messageText.className = "message success";

  answerInput.disabled = true;
  submitButton.disabled = true;
  restartButton.hidden = false;
}

// 제출 버튼을 눌렀을 때 정답/오답 판정
function handleSubmit() {
  const userAnswer = normalizeText(answerInput.value.trim());
  const correctAnswer = normalizeText(quizData[currentIndex].answer);

  if (!userAnswer) {
    messageText.textContent = "정답을 입력해주세요.";
    messageText.className = "message error";
    return;
  }

  if (userAnswer === correctAnswer) {
    score += 1;
    currentIndex += 1;

    if (currentIndex >= quizData.length) {
      scoreText.textContent = `점수: ${score}`;
      showFinalResult();
      return;
    }

    messageText.textContent = "정답입니다! 다음 문제로 넘어갑니다.";
    messageText.className = "message success";

    setTimeout(renderQuestion, 500);
  } else {
    wrongAttempts += 1;

    if (wrongAttempts >= 2) {
      const revealedAnswer = quizData[currentIndex].answer;
      messageText.textContent = `오답 2회! 정답: ${revealedAnswer}`;
      messageText.className = "message error";

      currentIndex += 1;

      if (currentIndex >= quizData.length) {
        setTimeout(() => {
          scoreText.textContent = `점수: ${score}`;
          showFinalResult();
        }, 800);
        return;
      }

      setTimeout(renderQuestion, 800);
      return;
    }

    messageText.textContent = "다시 시도하세요";
    messageText.className = "message error";
  }
}

// 다시 시작 버튼을 눌렀을 때 초기화
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  wrongAttempts = 0;

  answerInput.disabled = false;
  submitButton.disabled = false;
  restartButton.hidden = true;

  renderQuestion();
}

submitButton.addEventListener("click", handleSubmit);
restartButton.addEventListener("click", restartQuiz);
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
});

// 첫 화면 초기화
renderQuestion();
