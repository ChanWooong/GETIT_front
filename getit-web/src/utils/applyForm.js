/**
 * 지원서 폼 answers(q1~q5) ↔ API payload(answer1~answer5, agree) 변환
 */

/** answers → API 제출/임시저장 payload */
export function answersToPayload(answers) {
  const payload = {
    answer1: answers.q1 ?? '',
    answer2: answers.q2 ?? '',
    answer3: answers.q3 ?? '',
    answer4: answers.q4 ?? '',
    answer5: answers.q5 ?? '',
    agree: true,
  };
  return payload;
}

/** API 응답 data → answers 객체 */
export function payloadToAnswers(data) {
  if (!data) return { q1: '', q2: '', q3: '', q4: '', q5: '' };
  return {
    q1: data.answer1 ?? '',
    q2: data.answer2 ?? '',
    q3: data.answer3 ?? '',
    q4: data.answer4 ?? '',
    q5: data.answer5 ?? '',
  };
}
