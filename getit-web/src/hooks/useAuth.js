import { useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ROLES } from '../constants';

function resolveInitialRole() {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) return ROLES.GUEST;
    const decoded = jwtDecode(token);
    return decoded.role || ROLES.GUEST;
  } catch {
    return ROLES.GUEST;
  }
}

/**
 * 인증 상태와 역할 파생 값.
 * userRole, setUserRole, isLoggedIn, isApproved, isAdmin, isMember
 */
export function useAuth() {
  const [userRole, setUserRoleState] = useState(resolveInitialRole);

  const setUserRole = useCallback((role) => {
    setUserRoleState(role);
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
