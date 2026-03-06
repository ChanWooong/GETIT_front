import { ROLES } from '../../constants';

/**
 * 역할 값에 따른 뱃지 Tailwind 클래스 반환 (Admin 테이블 등)
 */
export function getRoleBadgeClass(role) {
  if (role === ROLES.ADMIN) return 'bg-red-500/20 text-red-400';
  if (role === ROLES.MEMBER) return 'bg-cyan-500/20 text-cyan-400';
  return 'bg-white/10 text-gray-400';
}
