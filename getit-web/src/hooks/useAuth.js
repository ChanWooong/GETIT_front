import { ROLES } from '../constants';
import { useAuthStore } from './authStore';

/**
 * 인증 상태와 역할 파생 값 (전역 authStore 구독).
 * - 한 곳에서 logout() 호출 시 모든 컴포넌트가 동시에 갱신됨.
 * - ROLE_GUEST: 로그인했으나 미승인 (네비에는 LOGOUT 표시)
 * - ROLE_MEMBER: 멤버 승인됨
 * - ROLE_ADMIN: 관리자
 */
export function useAuth() {
  const userRole = useAuthStore((s) => s.userRole);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const userName = useAuthStore((s) => s.userName);
  const setUserRole = useAuthStore((s) => s.setUserRole);
  const setUserName = useAuthStore((s) => s.setUserName);
  const logout = useAuthStore((s) => s.logout);

  const isApproved = userRole === ROLES.MEMBER || userRole === ROLES.ADMIN;
  const isAdmin = userRole === ROLES.ADMIN;
  const isMember = userRole === ROLES.MEMBER;

  return {
    userRole,
    userName,
    setUserRole,
    setUserName,
    logout,
    isLoggedIn,
    isApproved,
    isAdmin,
    isMember,
  };
}
