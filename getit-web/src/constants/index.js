/**
 * 공통 이미지 경로 (public/images/ 에 넣은 파일).
 * 사용: <img src={IMAGES.LOGO} alt="..." /> 또는 <img src={IMAGES.경로} />
 * 새 이미지 추가 시 여기에 키와 경로를 추가하면 됨.
 */
export const IMAGES = {
  // 예: LOGO: '/images/logo.png',
};

/** 역할 (백엔드 DB/JWT와 동일: ROLE_ADMIN, ROLE_GUEST, ROLE_MEMBER) */
export const ROLES = {
  GUEST: 'ROLE_GUEST',
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
  APPLY_DRAFT_LOADED: '작성 중이던 임시 저장 데이터를 불러왔습니다.',
  APPLY_DRAFT_SAVED: '임시 저장이 완료되었습니다.',
  APPLY_DRAFT_ERROR: '임시 저장 중 오류가 발생했습니다.',
  APPLY_SUBMIT_CONFIRM: '제출 후에는 수정이 불가능합니다. 제출하시겠습니까?',
  APPLY_SUBMIT_ERROR: '제출 중 오류가 발생했습니다.',
  LECTURE_LOCKED: '아직 오픈되지 않은 강의입니다.',
};

/** 지원서 제출 완료 시 발표일 등 (문구에 삽입) */
export const APPLY_ANNOUNCE_DATE = '3월 15일';

/** Admin 지원자 목록·모달 문구 */
export const ADMIN_APPLY_MESSAGES = {
  LOADING: '데이터 로딩 중...',
  LIST_ERROR: '지원서 목록을 불러오는 중 오류가 발생했습니다.',
  SEARCH_PLACEHOLDER: '이름으로 검색...',
  NO_APPLICANTS: '현재 접수된 지원서가 없습니다.',
  NO_NAME: '이름 없음',
  NO_DEPARTMENT: '학과 없음',
  NO_STUDENT_ID: '학번 없음',
  NO_PHONE: '전화번호 없음',
  NO_ANSWER: '내용 없음',
  REVIEW_TITLE: 'Application Review',
  VIEW_BUTTON: '보기',
  MODAL_CLOSE: '닫기',
};

/** Admin 권한(역할 지정) 관리 문구 */
export const ADMIN_AUTH_MESSAGES = {
  LOADING: '가입자 목록 로딩 중...',
  LIST_ERROR: '가입자 목록을 불러오는 중 오류가 발생했습니다.',
  ROLE_UPDATE_SUCCESS: '역할이 변경되었습니다.',
  ROLE_UPDATE_ERROR: '역할 변경 중 오류가 발생했습니다.',
  ROLE_CONFIRM: (name, roleLabel) => `"${name}" 님을 ${roleLabel}(으)로 지정하시겠습니까?`,
  NO_USERS: '승인 대기 중인 가입자가 없습니다.',
  SEARCH_PLACEHOLDER: '이름·학번으로 검색...',
  ROLE_GUEST: '게스트',
  ROLE_MEMBER: '멤버',
  ROLE_ADMIN: '관리자',
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
