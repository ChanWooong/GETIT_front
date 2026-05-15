import { PlayCircle, Settings, User, FileText, MessageCircle } from 'lucide-react';
import { INVEST_APP_URL } from '../../constants';

/** 공개 메뉴 (About, Executives, Recruit) */
export const PUBLIC_LINKS = [
  { to: '/about', label: 'ABOUT' },
  { to: '/executives', label: '운영진' },
  { to: '/recruit', label: '지원하기' },
];

/** 로그인 시 노출 (내 정보 수정) */
export const MY_PROFILE_LINK = { to: '/myProfile', label: '내 정보', Icon: User };

/** 멤버 전용 링크 (Lecture, Invest) - 모의투자는 별도 서비스라 새 탭으로 오픈 */
export const MEMBER_LINKS = [
  { to: '/lecture', label: '강의 목록', Icon: PlayCircle },
  { to: '/my-qna', label: '내 Q&A', Icon: MessageCircle },
  { to: '/assignments', label: '내 과제', Icon: FileText },

];

/** 관리자 전용 링크 */
export const ADMIN_LINK = { to: '/admin', label: 'ADMIN', Icon: Settings };
