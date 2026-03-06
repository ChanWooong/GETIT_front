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

function resolveRoleFromToken() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) return ROLES.GUEST;
    const decoded = jwtDecode(token);
    const raw = decoded.role ?? (Array.isArray(decoded.authorities) && decoded.authorities[0]) ?? decoded.authority ?? null;
    return normalizeRole(raw) || ROLES.GUEST;
  } catch {
    return ROLES.GUEST;
  }
}

/**
 * 인증 상태와 역할 파생 값.
 * userRole, setUserRole, isLoggedIn, isApproved, isAdmin, isMember
 */
export function useAuth() {
  const [userRole, setUserRoleState] = useState(resolveRoleFromToken);

  const setUserRole = useCallback((role) => {
    setUserRoleState(role);
  }, []);

  useEffect(() => {
    const synced = resolveRoleFromToken();
    setUserRoleState((prev) => (prev !== synced ? synced : prev));
  }, []);

  const isLoggedIn = userRole !== ROLES.GUEST;
  const isApproved = userRole === ROLES.MEMBER || userRole === ROLES.ADMIN;
  const isAdmin = userRole === ROLES.ADMIN;
  const isMember = userRole === ROLES.MEMBER;

  return {
    userRole,
    setUserRole,
    isLoggedIn,
    isApproved,
    isAdmin,
    isMember,
  };
}
