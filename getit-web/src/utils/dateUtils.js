/**
 * 모집 기간은 "한국 시간(KST)" 기준입니다.
 * 서버는 한국 시간에서 10시간을 뺀 값(KST-10)을 저장·반환합니다.
 * - 전송: 프론트는 한국 시간 "YYYY-MM-DDTHH:mm:00" 그대로 전송.
 * - 수신: 서버 값에 10시간을 더해 한국 시간으로 표시.
 */

const SERVER_OFFSET_HOURS = 10;

/**
 * datetime-local 값(한국 시간)을 서버 전송용 문자열로 정규화
 * 서버에서 이 값을 받아 10시간 빼서 저장합니다.
 * @param {string} dateTimeLocal - "YYYY-MM-DDTHH:mm" (KST)
 * @returns {string} "YYYY-MM-DDTHH:mm:00"
 */
export function kstToServerFormat(dateTimeLocal) {
  if (!dateTimeLocal || !dateTimeLocal.trim()) return '';
  const s = dateTimeLocal.trim();
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s) ? s : s.replace(/T(\d{2}:\d{2})$/, 'T$1:00');
}

/**
 * 서버에서 받은 값(KST-10)을 datetime-local 형식(한국 시간)으로 변환
 * 서버 값에 10시간을 더해 KST로 복원합니다.
 * @param {string} serverStored - "YYYY-MM-DDTHH:mm:ss" (저장된 값 = KST - 10시간)
 * @returns {string} "YYYY-MM-DDTHH:mm" (KST, input value용)
 */
export function serverStoredToKstDateTimeLocal(serverStored) {
  if (!serverStored || !serverStored.trim()) return '';
  const s = serverStored.trim().replace('Z', '');
  const date = new Date(s + (s.includes('+') || s.endsWith('Z') ? '' : 'Z'));
  if (Number.isNaN(date.getTime())) return '';
  date.setUTCHours(date.getUTCHours() + SERVER_OFFSET_HOURS);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const h = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  return `${y}-${m}-${d}T${h}:${min}`;
}

/**
 * 한국 시간으로 포맷된 문자열 표시 (예: "2025년 3월 15일 23:59")
 * 서버 저장값(KST-10) 또는 ISO 문자열 모두 가능.
 * @param {string} isoOrStored
 * @returns {string}
 */
export function formatKstLong(isoOrStored) {
  if (!isoOrStored || !isoOrStored.trim()) return '';
  const date = new Date(isoOrStored.trim());
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
