/**
 * 모집 기간은 "한국 시간(KST, Asia/Seoul)" 기준으로 통일합니다.
 * 서버(시드니)는 UTC로 저장·비교하므로, 프론트에서는 KST ↔ UTC 변환만 담당합니다.
 */

/**
 * datetime-local 값(한국 시간으로 간주)을 UTC ISO 8601 문자열로 변환
 * @param {string} dateTimeLocal - "YYYY-MM-DDTHH:mm" (KST 기준)
 * @returns {string} "YYYY-MM-DDTHH:mm:ss.sssZ"
 */
export function kstDateTimeLocalToUTC(dateTimeLocal) {
  if (!dateTimeLocal || !dateTimeLocal.trim()) return '';
  const s = dateTimeLocal.trim();
  const withSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s) ? s : s.replace(/T(\d{2}:\d{2})$/, 'T$1:00');
  const date = new Date(withSeconds + '+09:00');
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString();
}

/**
 * 서버에서 받은 UTC ISO 문자열을 datetime-local 형식(한국 시간)으로 변환
 * @param {string} isoUtc - "YYYY-MM-DDTHH:mm:ss.sssZ" 또는 "YYYY-MM-DDTHH:mm:ssZ"
 * @returns {string} "YYYY-MM-DDTHH:mm" (KST, input value용)
 */
export function utcISOToKstDateTimeLocal(isoUtc) {
  if (!isoUtc || !isoUtc.trim()) return '';
  const date = new Date(isoUtc.trim());
  if (Number.isNaN(date.getTime())) return '';
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
  const y = get('year');
  const m = get('month');
  const d = get('day');
  const h = get('hour');
  const min = get('minute');
  return `${y}-${m}-${d}T${h}:${min}`;
}

/**
 * 한국 시간으로 포맷된 문자열 표시 (예: "2025년 3월 15일 23:59")
 * @param {string} isoUtc
 * @returns {string}
 */
export function formatKstLong(isoUtc) {
  if (!isoUtc || !isoUtc.trim()) return '';
  const date = new Date(isoUtc.trim());
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
