/**
 * 과제 제출용 로컬 File 목록 병합. 이름·크기·lastModified가 같으면 중복으로 보고 건너뜀.
 * @param {File[]} existing
 * @param {File[]} incoming
 * @returns {File[]}
 */
export function mergeAssignmentFiles(existing, incoming) {
  const key = (f) => `${f.name}\0${f.size}\0${f.lastModified}`;
  const seen = new Set(existing.map(key));
  const out = [...existing];
  for (const f of incoming) {
    const k = key(f);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(f);
    }
  }
  return out;
}
