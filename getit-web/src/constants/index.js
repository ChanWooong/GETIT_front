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

/** API Base URL 및 경로 (백엔드 연동) */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const API = {
  BASE_URL: API_BASE_URL,
  PATHS: {
    LECTURES: '/api/lectures',
    LECTURE_DETAIL: (id) => `/api/lecture/${id}`,
    LECTURE_QNA_ME: (lectureId) => `/api/lecture/${lectureId}/qna/me`,
    LECTURE_FILES: (lectureId) => `/api/lecture/${lectureId}/files`,
    ASSIGNMENT_FILE_DOWNLOAD: (fileId) => `/api/assignments/files/${fileId}/download`,
    ADMIN_LECTURE_FILES: (lectureId) => `/api/admin/lecture/${lectureId}/files`,
    ADMIN_LECTURE_FILE: (lectureId, fileId) => `/api/admin/lecture/${lectureId}/files/${fileId}`,
  },
};

/** 모의투자 앱 URL (별도 프론트/서버, 새 탭에서 오픈) */
export const INVEST_APP_URL = import.meta.env.VITE_INVEST_APP_URL || 'https://stockgame.get-it.cloud';

/**
 * 사용자에게 보여주는 알림/에러 메시지.
 * 문구 변경 시 이 파일만 수정하면 된다.
 */
export const MESSAGES = {
  PROFILE_SETUP_REQUIRED: '서비스 이용을 위해 추가 정보 입력이 필요합니다.',
  LOGIN_REQUIRED: '로그인이 필요합니다.',
  PROFILE_SUCCESS: '정보 등록이 완료되었습니다!',
  PROFILE_FORM_ERROR: '입력 형식을 다시 확인해주세요',
  MY_PROFILE_CONFIRM: '입력하신 정보가 확실한가요?',
  MY_PROFILE_SAVED: '저장되었습니다.',
  MY_PROFILE_LOAD_ERROR: '회원 정보를 불러오지 못했습니다.',
  MY_PROFILE_SAVE_ERROR: '저장 중 오류가 발생했습니다.',
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
  LECTURE_LIST_ERROR: '강의 목록을 불러오지 못했습니다.',
  LECTURE_LIST_RETRY: '잠시 후 다시 시도해 주세요.',
  LECTURE_LIST_LOADING: '강의 목록을 불러오는 중...',
  LECTURE_VIDEO_LOAD_ERROR: '영상을 불러올 수 없습니다.',
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
  DETAIL_ERROR: '지원서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
};

/** Admin 부원 학습 현황 문구 */
export const ADMIN_MEMBER_MESSAGES = {
  LOADING: '데이터 로딩 중...',
  LIST_ERROR: '데이터 로드 실패',
  SEARCH_PLACEHOLDER: '이름으로 검색...',
  SUBTAB_MEMBERS: '멤버 현황',
  SUBTAB_QNA: 'Q&A 확인',
  SUBTAB_ASSIGNMENTS: '과제 제출 현황',
  QNA_SELECT_LECTURE: '강의 선택',
  QNA_NO_LECTURES: '강의가 없습니다.',
  QNA_ROOMS: '질문한 멤버 목록',
  QNA_NO_ROOMS: '질문이 없습니다.',
  QNA_ANSWER_PLACEHOLDER: '답변 입력',
  QNA_SUBMIT_ANSWER: '답변 등록',
  QNA_BOARD_TITLE: 'Q&A 게시판',
  QNA_COLUMN_LECTURE: '강좌',
  QNA_COLUMN_MEMBER: '멤버',
  QNA_COLUMN_PREVIEW: '내용',
  QNA_COLUMN_DATE: '날짜',
  QNA_COLUMN_STATUS: '상태',
  QNA_ACTION_ANSWER: '답변',
  QNA_UNANSWERED: '미답변',
  QNA_ANSWERED: '답변완료',
  QNA_BOARD_EMPTY: '등록된 질문이 없습니다.',
  QNA_LOADING: 'Q&A 목록 로딩 중...',
  QNA_NO_MESSAGES: '메시지 없음',
  QNA_DELETE_ANSWER: '삭제',
  QNA_DELETE_ANSWER_CONFIRM: '이 답변을 삭제할까요?',
  QNA_DELETE_ANSWER_ERROR: '답변 삭제에 실패했습니다.',
  ASSIGNMENTS_LOADING: '과제 목록 로딩 중...',
  ASSIGNMENTS_EMPTY: '제출된 과제가 없습니다.',
  ASSIGNMENTS_DOWNLOAD_PREPARING: '준비 중',
  ASSIGNMENTS_DOWNLOAD: '다운로드',
  ASSIGNMENTS_DOWNLOAD_ERROR: '과제 파일 다운로드에 실패했습니다.',
  ASSIGNMENTS_GITHUB: 'GitHub',
  ASSIGNMENTS_FILTER_ALL: '전체',
  ASSIGNMENTS_FILTER_SW: 'SW',
  ASSIGNMENTS_FILTER_STARTUP: '창업',
  ASSIGNMENTS_MEMBER: '제출자',
  ASSIGNMENTS_COMMENT: '제출 코멘트',
  ASSIGNMENTS_FEEDBACK: '관리자 코멘트',
  ASSIGNMENTS_FEEDBACK_PLACEHOLDER: '코멘트를 입력하세요...',
  ASSIGNMENTS_FEEDBACK_ADD: '코멘트 추가',
  ASSIGNMENTS_FEEDBACK_SAVE: '저장',
  ASSIGNMENTS_FEEDBACK_DELETE: '삭제',
  ASSIGNMENTS_FEEDBACK_DELETE_CONFIRM: '이 코멘트를 삭제할까요?',
  ASSIGNMENTS_FEEDBACK_ERROR: '코멘트 처리 중 오류가 발생했습니다.',
  ASSIGNMENTS_TRACK_LABEL: '트랙',
  ASSIGNMENTS_TOGGLE_OPEN: '펼치기',
  ASSIGNMENTS_TOGGLE_CLOSE: '접기',
  ASSIGNMENTS_FEEDBACK_MANAGE: '코멘트 관리',
  ASSIGNMENTS_FEEDBACK_MODAL_TITLE: '코멘트 관리',
  MODAL_CLOSE: '닫기',
  DETAIL_VIEW: '상세 보기',
  GITHUB_LINK_LABEL: '깃허브 링크',
};

/** Admin 권한(역할 지정) 관리 문구 */
export const ADMIN_AUTH_MESSAGES = {
  LOADING: '멤버 목록 로딩 중...',
  LIST_ERROR: '멤버 목록을 불러오는 중 오류가 발생했습니다.',
  ROLE_UPDATE_SUCCESS: '역할이 변경되었습니다.',
  ROLE_UPDATE_ERROR: '역할 변경 중 오류가 발생했습니다.',
  ROLE_CONFIRM: (name, roleLabel) => `"${name}" 님을 ${roleLabel}(으)로 지정하시겠습니까?`,
  DELETE_CONFIRM: (name) => `"${name || '이 사용자'}" 님을 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.`,
  DELETE_SUCCESS: '삭제되었습니다.',
  DELETE_ERROR: '삭제 중 오류가 발생했습니다.',
  NO_USERS: '조회된 멤버가 없습니다.',
  SEARCH_PLACEHOLDER: '이름·학번·이메일로 검색...',
  ROLE_GUEST: '게스트',
  ROLE_MEMBER: '멤버',
  ROLE_ADMIN: '관리자',
  FILTER_ALL: '전체',
};

/** Project 페이지 헤더·설명 문구 */
export const PROJECT_PAGE = {
  TITLE_MAIN: 'OUR',
  TITLE_HIGHLIGHT: 'PROJECTS',
  SUBTITLE: '우리가 밤새워 만든 결과물들입니다.',
  DESCRIPTION: '작은 아이디어에서 시작해 실제 서비스가 되기까지의 여정을 확인해보세요.',
  LINK_SOURCE: 'Project Github',
  LINK_DEMO: 'Live Demo',
};

/** Project 페이지 카테고리 필터 목록 (첫 항목이 기본값) */
export const PROJECT_CATEGORIES = ['All', 'Web', 'App', 'AI'];

/** Admin 강의 관리 문구 */
export const ADMIN_LECTURE_MESSAGES = {
  TAB: '강의 관리',
  LIST_TITLE: '강의 목록',
  ADD: '강의 추가',
  EDIT: '수정',
  DELETE: '삭제',
  QNA: 'Q&A',
  NO_LECTURES: '등록된 강의가 없습니다.',
  DELETE_CONFIRM: (title) => `"${title || '이 강의'}"를 삭제하시겠습니까?`,
  DELETE_SUCCESS: '삭제되었습니다.',
  FORM_TITLE: '제목',
  FORM_DESCRIPTION: '설명',
  FORM_VIDEO_URL: '유튜브 URL (1개)',
  FORM_RESOURCE_URL: '강의 자료 URL (선택)',
  FORM_RESOURCE_URL_PLACEHOLDER: 'https://... (PDF, PPT 링크)',
  FORM_URL_INVALID: '올바른 URL 형식이어야 합니다.',
  FORM_TRACK: '트랙',
  FORM_WEEK: '주차',
  FORM_STATUS: '상태',
  SAVE: '저장',
  CANCEL: '취소',
  SAVE_SUCCESS: '저장되었습니다.',
  TRACK_SW: 'SW',
  TRACK_STARTUP: '창업',
  QNA_MODAL_TITLE: 'Q&A 관리',
  QNA_NO_QUESTIONS: '아직 질문이 없습니다.',
  QNA_ANSWER: '답변 작성',
  QNA_ANSWER_PLACEHOLDER: '답변 내용을 입력하세요.',
  QNA_SUBMIT_ANSWER: '답변 등록',
  // 과제(Task) 관리
  TASK_MANAGE: '과제 관리',
  TASK_TITLE: '과제 제목',
  TASK_DESCRIPTION: '과제 설명',
  TASK_DEADLINE: '마감일 (선택)',
  TASK_LOADING: '과제 정보 로딩 중...',
  TASK_NOT_FOUND: '이 강의에 등록된 과제가 없습니다.',
  TASK_SAVE_SUCCESS: '과제 정보가 저장되었습니다.',
  TASK_SAVE_ERROR: '과제 저장에 실패했습니다.',
  TASK_DELETE_CONFIRM: '이 강의의 과제를 삭제하시겠습니까? 제출된 과제 파일도 함께 삭제됩니다.',
  TASK_DELETE_SUCCESS: '과제가 삭제되었습니다.',
  TASK_DELETE_ERROR: '과제 삭제에 실패했습니다.',
  TASK_LOAD_ERROR: '과제 정보를 불러오지 못했습니다.',
  // 강의 자료 파일(첨부)
  MATERIALS_MANAGE: '자료 파일 관리',
  MATERIALS_LOADING: '자료 목록을 불러오는 중...',
  MATERIALS_EMPTY: '등록된 첨부 파일이 없습니다.',
  MATERIALS_UPLOAD_BUTTON: '파일 업로드',
  MATERIALS_UPLOADING: '업로드 중...',
  MATERIALS_UPLOAD_HINT: 'PDF, 문서, 이미지 등 (여러 개 선택 가능)',
  MATERIALS_DELETE: '삭제',
  MATERIALS_DELETING: '삭제 중...',
  MATERIALS_DELETE_CONFIRM: '이 파일을 삭제하시겠습니까?',
  MATERIALS_UPLOAD_SUCCESS: '파일이 업로드되었습니다.',
  MATERIALS_UPLOAD_ERROR: '업로드에 실패했습니다.',
  MATERIALS_DELETE_ERROR: '삭제에 실패했습니다.',
  MATERIALS_LIST_ERROR: '자료 목록을 불러오지 못했습니다.',
};

/** 멤버 강의 목록/상세 문구 */
/** SW 트랙 제목 필터 옵션 (value: '' = 전체, 그 외는 제목에 포함된 문자열로 필터) */
export const SW_TRACK_FILTERS = [
  { value: '', label: '전체' },
  { value: 'WEB', label: 'WEB' },
  { value: 'React', label: 'React' },
  { value: 'Express', label: 'Express' },
  { value: '세미나', label: '세미나' },
];

export const LECTURE_PAGE_MESSAGES = {
  NO_LECTURES_IN_TRACK: '해당 트랙에 등록된 강의가 없습니다.',
  NO_LECTURES_FOR_FILTER: '선택한 필터에 맞는 강의가 없습니다.',
  MATERIAL_PREPARING: '준비 중',
  MATERIAL_VIEW_LINK: '자료 보기',
  MATERIAL_SECTION_TITLE: '강의 자료',
  MATERIAL_LINK_SECTION: '링크 자료',
  MATERIAL_ATTACHMENTS_SECTION: '첨부 파일',
  MATERIAL_DOWNLOAD: '다운로드',
  MATERIAL_VIEW_NEW_TAB: '새 탭에서 보기',
  MATERIAL_PDF_NO_URL: 'PDF URL이 없습니다.',
  MATERIAL_PDF_LOADING: 'PDF 로딩 중...',
  MATERIAL_PDF_LOAD_ERROR: 'PDF를 불러올 수 없습니다. (외부 링크는 CORS 제한으로 실패할 수 있습니다.)',
  MATERIAL_DOWNLOAD_ERROR: '파일을 다운로드하지 못했습니다.',
  MATERIAL_OPEN_TAB_ERROR: '새 탭에서 열지 못했습니다.',
  MATERIAL_NO_ATTACHMENTS: '첨부된 파일이 없습니다.',
  QNA_PLACEHOLDER: '질문하기...',
  QNA_SEND: '보내기',
  QNA_NO_MESSAGES: '아직 질문이 없습니다.',
  LECTURE_NOT_FOUND: '강의를 찾을 수 없습니다.',
  QNA_DELETE: '삭제',
  QNA_DELETE_CONFIRM: '이 질문을 삭제할까요?',
  QNA_DELETE_ERROR: '질문 삭제에 실패했습니다.',
  ASSIGNMENT_GITHUB_LABEL: 'GitHub 링크',
  ASSIGNMENT_GITHUB_PLACEHOLDER: 'https://github.com/...',
  ASSIGNMENT_SUBMIT: '과제 제출하기',
  ASSIGNMENT_UPDATE: '과제 수정하기',
  ASSIGNMENT_EDIT_MODE: '이미 제출한 과제가 있어 수정 모드로 전환됩니다.',
  ASSIGNMENT_NEW_FILES_LABEL: '추가 파일',
  ASSIGNMENT_KEPT_FILES_LABEL: '현재 제출 파일',
  ASSIGNMENT_REMOVE_FILE: '제거',
  ASSIGNMENT_SAVE_SUCCESS: '과제가 저장되었습니다.',
  ASSIGNMENT_SAVE_ERROR: '과제 저장에 실패했습니다.',
  ASSIGNMENT_REFRESH_ERROR: '저장은 성공했지만 최신 제출 내역을 불러오지 못했습니다.',
  ASSIGNMENT_EMPTY_ERROR: '파일, 코멘트, GitHub 링크 중 하나는 입력해야 합니다.',
  ASSIGNMENT_FILE_REMOVE_HINT: '파일을 제거하면 저장 시 반영됩니다.',
  ASSIGNMENT_UNDO_REMOVE: '되돌리기',
  ASSIGNMENT_CANCEL: '취소',
  ASSIGNMENT_SAVING: '저장 중...',
  ASSIGNMENT_FEEDBACK_TITLE: '관리자 코멘트',
  ASSIGNMENT_FEEDBACK_EMPTY: '등록된 코멘트가 없습니다.',
  ASSIGNMENT_FEEDBACK_LOADING: '코멘트 불러오는 중...',
};

/** 멤버 전체 Q&A 모아보기 페이지 */
export const MY_QNA_PAGE = {
  TITLE: '내 Q&A',
  SUBTITLE: '참여한 강의의 질문과 답변을 한곳에서 확인할 수 있습니다.',
  LOADING: 'Q&A 목록을 불러오는 중...',
  EMPTY: '등록한 Q&A가 없습니다.',
  OPEN_IN_LECTURE: '강의에서 보기',
  UNANSWERED: '미답변',
  ANSWERED: '답변 있음',
  LAST_ACTIVITY: '최근 활동',
  LOAD_ERROR: 'Q&A를 불러오지 못했습니다.',
  PREVIEW_FALLBACK: '(내용 없음)',
  TRACK_SW: 'SW',
  TRACK_STARTUP: '창업',
};
