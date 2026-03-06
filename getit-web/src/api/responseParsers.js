/**
 * Admin API 응답 파싱 유틸.
 * GET /api/admin/members 는 멤버 배열을 그대로 반환한다.
 */

/**
 * GET /api/admin/members 응답에서 멤버 목록 배열을 반환.
 * @param {import('axios').AxiosResponse} response - api.get() 반환값
 * @returns {Array} 멤버 객체 배열 (파싱 실패 시 [])
 */
export function parseMembersListResponse(response) {
  const data = response?.data ?? response;
  return Array.isArray(data) ? data : [];
}
