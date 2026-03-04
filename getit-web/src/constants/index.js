/** 역할 (JWT role 값과 동일) */
export const ROLES = {
  GUEST: 'GUEST',
  MEMBER: 'ROLE_MEMBER',
  ADMIN: 'ROLE_ADMIN',
};

/** 강의 상태 (백엔드와 동일한 문자열 사용) */
export const LECTURE_STATUS = {
  DONE: 'Done',
  PROGRESS: 'Progress',
  LOCKED: 'Locked',
};

/** 트랙 구분 (SW / 창업) */
export const LECTURE_TRACK = {
  SW: 'SW',
  STARTUP: 'STARTUP',
};

/** API Base URL 및 강의 목록 경로 (백엔드 연동 시 사용) */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const API = {
  BASE_URL: API_BASE_URL,
  PATHS: {
    /** GET 강의 목록. 응답 예: { swTrack: Lecture[], startupTrack: Lecture[] } */
    LECTURES: '/api/lectures',
  },
};

/**
 * 사용자에게 보여주는 알림/에러 메시지.
 * 문구 변경 시 이 파일만 수정하면 된다.
 */
export const MESSAGES = {
  PROFILE_SETUP_REQUIRED: '서비스 이용을 위해 추가 정보 입력이 필요합니다.',
  LOGIN_REQUIRED: '로그인이 필요합니다.',
  PROFILE_SUCCESS: '정보 등록이 완료되었습니다!',
  PROFILE_FORM_ERROR: '입력 형식을 다시 확인해주세요',
  APPLY_ALL_REQUIRED: '모든 문항을 작성해주세요!',
  APPLY_SUCCESS:
    '제출이 완료되었습니다.\n저희 GET IT에 지원해주셔서 진심으로 감사드리며,\n서류 발표 일정을 안내해 드리겠습니다.',
  APPLY_LOGIN_REQUIRED: '지원서 작성을 위해 먼저 로그인이 필요합니다.',
  LECTURE_LOCKED: '아직 오픈되지 않은 강의입니다.',
};

/** Project 페이지 헤더·설명 문구 */
export const PROJECT_PAGE = {
  TITLE_MAIN: 'OUR',
  TITLE_HIGHLIGHT: 'PROJECTS',
  SUBTITLE: '우리가 밤새워 만든 결과물들입니다.',
  DESCRIPTION: '작은 아이디어에서 시작해 실제 서비스가 되기까지의 여정을 확인해보세요.',
  LINK_SOURCE: 'Source Code',
  LINK_DEMO: 'Live Demo',
};

/** Project 페이지 카테고리 필터 목록 (첫 항목이 기본값) */
export const PROJECT_CATEGORIES = ['All', 'Web', 'App', 'AI'];
