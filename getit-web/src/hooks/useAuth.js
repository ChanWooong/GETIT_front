import { useState, useCallback, useEffect } from 'react';
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
    const raw = decoded.role ?? (Array.isArray(decoded.authorities) && decoded.authorities[0]) ?? decoded.authority ?? null;
    const role = normalizeRole(raw) || ROLES.GUEST;
    return { role, isLoggedIn: true };
  } catch {
    return { role: ROLES.GUEST, isLoggedIn: false };
  }
}

/**
 * 인증 상태와 역할 파생 값.
 * - ROLE_GUEST: 로그인했으나 미승인 (네비에는 LOGOUT 표시)
 * - ROLE_MEMBER: 멤버 승인됨
 * - ROLE_ADMIN: 관리자
 */
export function useAuth() {
  const initial = resolveAuthFromToken();
  const [userRole, setUserRoleState] = useState(initial.role);
  const [isLoggedInState, setIsLoggedInState] = useState(initial.isLoggedIn);

  const setUserRole = useCallback((role) => {
    setUserRoleState(role);
    setIsLoggedInState(role !== ROLES.GUEST);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') localStorage.removeItem('accessToken');
    setUserRoleState(ROLES.GUEST);
    setIsLoggedInState(false);
  }, []);

  useEffect(() => {
    const { role, isLoggedIn } = resolveAuthFromToken();
    setUserRoleState(role);
    setIsLoggedInState(isLoggedIn);
  }, []);

  const isLoggedIn = isLoggedInState;
  const isApproved = userRole === ROLES.MEMBER || userRole === ROLES.ADMIN;
  const isAdmin = userRole === ROLES.ADMIN;
  const isMember = userRole === ROLES.MEMBER;

  return {
    userRole,
    setUserRole,
    logout,
    isLoggedIn,
    isApproved,
    isAdmin,
    isMember,
  };
}
