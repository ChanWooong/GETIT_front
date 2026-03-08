import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { ROLES } from '../constants';

const ROLE_VALUES = Object.values(ROLES);

function normalizeRole(role) {
  if (!role || typeof role !== 'string') return null;
  const upper = role.toUpperCase();
  if (ROLE_VALUES.includes(role)) return role;
  if (upper === 'GUEST') return ROLES.GUEST;
  if (upper === 'MEMBER' || upper === 'ROLE_MEMBER') return ROLES.MEMBER;
  if (upper === 'ADMIN' || upper === 'ROLE_ADMIN') return ROLES.ADMIN;
  return role;
}

function resolveAuthFromToken() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) return { role: ROLES.GUEST, isLoggedIn: false };
    const decoded = jwtDecode(token);
    const raw =
      decoded.role ??
      (Array.isArray(decoded.authorities) && decoded.authorities[0]) ??
      decoded.authority ??
      null;
    const role = normalizeRole(raw) || ROLES.GUEST;
    return { role, isLoggedIn: true };
  } catch {
    return { role: ROLES.GUEST, isLoggedIn: false };
  }
}

/**
 * 인증 전역 상태 (Single Source of Truth).
 * 로그아웃 시 모든 useAuth() 구독 컴포넌트가 동시에 갱신됨.
 * userName: API 연동 후 setUserName으로 세팅하면 네비에 표시됨.
 */
export const useAuthStore = create((set) => {
  const initial = resolveAuthFromToken();
  return {
    userRole: initial.role,
    isLoggedIn: initial.isLoggedIn,
    userName: null,

    setUserRole: (role) =>
      set({ userRole: role, isLoggedIn: role !== ROLES.GUEST }),

    setUserName: (name) => set({ userName: name ?? null }),

    logout: () => {
      if (typeof window !== 'undefined') localStorage.removeItem('accessToken');
      set({ userRole: ROLES.GUEST, isLoggedIn: false, userName: null });
    },

    /** localStorage 토큰이 외부에서 바뀐 경우 동기화 (예: OAuth 리다이렉트 후) */
    syncFromToken: () => set(resolveAuthFromToken()),
  };
});
