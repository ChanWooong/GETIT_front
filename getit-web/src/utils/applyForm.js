/**
 * 지원서 폼 answers(q1~q8) ↔ API payload(answer1~answer8, agree) 변환
 */

/** answers → API 제출/임시저장 payload */
export function answersToPayload(answers) {
  const payload = {
    answer1: answers.q1 ?? '',
    answer2: answers.q2 ?? '',
    answer3: answers.q3 ?? '',
    answer4: answers.q4 ?? '',
    answer5: answers.q5 ?? '',
    answer6: answers.q6 ?? '',
    answer7: answers.q7 ?? '',
    answer8: answers.q8 ?? '',
    agree: answers.q8 === 'agreed',
  };
  return payload;
}

const DEFAULT_ANSWERS = {
  q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '',
};

/**
 * 지원서 answers가 제출 가능한지 검사.
 * q8은 'agreed', 그 외 문항은 비어 있지 않아야 함.
 */
export function isApplicationComplete(answers) {
  if (!answers || typeof answers !== 'object') return false;
  return !Object.entries(answers).some(([id, val]) => {
    const s = (val ?? '').toString().trim();
    return id === 'q8' ? s !== 'agreed' : s === '';
  });
}

/** API 응답 data → answers 객체 */
export function payloadToAnswers(data) {
  if (!data) return { ...DEFAULT_ANSWERS };
  const q8 = data.answer8 ?? (data.agree ? 'agreed' : '');
  return {
    q1: data.answer1 ?? '',
    q2: data.answer2 ?? '',
    q3: data.answer3 ?? '',
    q4: data.answer4 ?? '',
    q5: data.answer5 ?? '',
    q6: data.answer6 ?? '',
    q7: data.answer7 ?? '',
    q8,
  };
}
