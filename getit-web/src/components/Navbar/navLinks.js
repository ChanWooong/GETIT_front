import { PlayCircle, TrendingUp, Settings, User } from 'lucide-react';

/** 공개 메뉴 (About, Executives, Recruit) */
export const PUBLIC_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/executives', label: 'Executives' },
  { to: '/recruit', label: 'Recruit' },
];

/** 로그인 시 노출 (내 정보 수정) */
export const MY_PROFILE_LINK = { to: '/myProfile', label: '내 정보', Icon: User };

/** 멤버 전용 링크 (Lecture, Invest) */
export const MEMBER_LINKS = [
  { to: '/lecture', label: 'Lecture', Icon: PlayCircle },
  { to: '/invest', label: 'Invest', Icon: TrendingUp },
];

/** 관리자 전용 링크 */
export const ADMIN_LINK = { to: '/admin', label: 'Admin', Icon: Settings };
