# 회원 정보 사용 방식 점검 및 수정 사항

## 0. 회원 정보 조회 API (예정)

백엔드에서 제공 예정인 **현재 로그인 회원 정보 조회** API 스펙이다.

| 항목 | 내용 |
|------|------|
| **메서드** | `GET` |
| **인증** | 요청 헤더에 토큰 전달 (프론트에서는 `api` axios 인스턴스 사용 시 자동으로 `Authorization: Bearer {accessToken}` 부착됨) |
| **응답 예시** | 아래 JSON |

```json
{
  "id": 1,
  "email": "test@gmail.com",
  "role": "ROLE_GUEST",
  "hasInfo": true,
  "name": "홍길동",
  "studentId": "20240001",
  "college": "IT",
  "department": "컴퓨터공학과",
  "cellNum": "010-1234-5678"
}
```

- **role**: `ROLE_GUEST` | `ROLE_MEMBER` | `ROLE_ADMIN` (authStore의 `normalizeRole`과 호환)
- **name**: 네비에 "OO 님"으로 표시할 이름
- **hasInfo**: 최초 정보 입력 여부 (ProfileSetup 리다이렉트 등에 활용 가능)
- 나머지 필드(`studentId`, `college`, `department`, `cellNum`)는 MyProfile 폼·ProfileSetup과 동일한 이름으로 사용 가능

**API 경로**: 백엔드와 협의 후 확정 (현재 프론트는 `GET /api/member/me` 사용 중인 페이지가 있음 → 동일 경로로 맞추면 됨)

---

## 1. 회원 정보 사용 방식 요약

### 1.1 전역 상태 (authStore / useAuth)

| 저장소 | 파일 | 역할 |
|--------|------|------|
| **authStore** | `getit-web/src/hooks/authStore.js` | Zustand. `userRole`, `isLoggedIn`, `userName` 단일 소스. |
| **useAuth()** | `getit-web/src/hooks/useAuth.js` | authStore 구독 → `userRole`, `userName`, `setUserName`, `logout`, `isLoggedIn`, `isApproved`, `isAdmin`, `isMember` 제공. |

- **userRole**: 앱 최초 마운트 시 `localStorage.accessToken`을 jwtDecode해 한 번만 세팅. 이후 별도 API로 갱신하지 않음.
- **userName**: store 초기값은 `null`. **현재 코드에서 `setUserName`을 호출하는 곳은 MyProfile 저장 성공 시 한 곳뿐.**

### 1.2 사용처

| 위치 | 사용 내용 |
|------|-----------|
| **App.jsx** | `useAuth()` → 라우트 가드(로그인/승인/관리자), `auth` 객체를 Navbar에 전달 |
| **Navbar (index, NavDesktop, NavMobile)** | `auth.userName` → "OO 님" 표시, `auth.userRole/isMember/isAdmin` → 메뉴 노출, `auth.logout` |
| **Recruit.jsx** | `useAuth().isLoggedIn` → 지원하기 클릭 시 로그인 유도 |
| **MyProfile** | `useAuth().setUserName` → 저장 성공 시 이름 반영, `GET /api/member/me`로 폼 로드 |
| **ProfileSetup** | `POST /api/member/info`로 최초 정보 등록 (authStore 갱신 없음) |
| **Apply.jsx** | `localStorage.getItem('accessToken')` 직접 사용, `GET /api/applies/me` 등 |
| **axios** | 요청 시 `Authorization: Bearer` 토큰 부착, 401/403 시 토큰 제거 후 `/` 리다이렉트 |

---

## 2. 수정 시 즉시 반영 여부 체크

| 시나리오 | 즉시 반영 여부 | 비고 |
|----------|----------------|------|
| **MyProfile에서 이름 수정 후 저장** | ✅ 반영됨 | `setUserName(formData.name)` 호출 → Zustand 갱신 → Navbar가 auth 구독 중이므로 "OO 님" 즉시 변경. |
| **로그아웃** | ✅ 반영됨 | `logout()` 시 store 초기화 → 모든 구독 컴포넌트 갱신. |
| **앱 진입/새로고침 시 "OO 님" 표시** | ❌ 미반영 | `userName`은 항상 초기값 `null` → 네비에는 "회원 님"만 표시됨. 서버에서 이름을 가져와 `setUserName` 하는 로직 없음. |
| **ProfileSetup(최초 정보 등록) 성공 후** | ❌ 미반영 | `POST /api/member/info` 성공 후 `setUserName` 미호출 → 홈으로 이동해도 "회원 님"으로 남음. |
| **MyProfile 페이지만 열었을 때 (저장 안 함)** | ❌ 미반영 | `GET /api/member/me`로 이름을 받아오지만 store에 넣지 않음 → 저장 버튼을 눌러야 네비에 이름 표시. |

---

## 3. 문제점 및 수정 제안

### 3.1 [권장] 앱 로드 시 표시 이름 초기화

- **문제**: 새로고침·재진입 시 `userName`이 항상 null이라 네비에 "회원 님"만 표시됨.
- **제안**: **0절 회원 정보 조회 API**가 준비되면, 로그인된 사용자에 대해 앱 초기화 시 한 번 GET 호출해 응답의 `name`으로 `setUserName(data.name)` 호출.
  - 구현 위치 후보: **App.jsx**의 `useEffect` (isLoggedIn일 때만 호출), 또는 **전용 훅**으로 분리해 App에서 사용.
  - 주의: 라우트마다 호출하지 않도록 한 번만 실행 (의존성 `[isLoggedIn]` 등). 상세한 수정 방법은 **6. 차후 수정 가이드** 참고.

### 3.2 [권장] ProfileSetup 성공 시 표시 이름 반영

- **문제**: 최초 정보 등록(POST /api/member/info) 성공 후 홈으로 가도 네비에 "회원 님"으로 남음.
- **제안**: ProfileSetup의 `handleSubmit`에서 API 성공 시 `setUserName(formData.name)` 호출 후 `navigate('/')`.
  - `useAuth()`에서 `setUserName`을 가져와 사용하면 됨.

### 3.3 [선택] MyProfile 로드 시 표시 이름 동기화

- **문제**: MyProfile에서 GET /api/member/me로 이름을 불러와도 store에는 넣지 않아, "저장"을 누르기 전까지 네비에는 반영되지 않음.
- **제안**: MyProfile의 `fetchMyInfo` 성공 시 `setUserName(data.name ?? null)` 한 번 호출. (3.1에서 앱 로드 시 이미 세팅하면 중복이지만, 3.1을 안 할 경우 이만으로도 MyProfile 진입 시 네비에 이름이 뜸.)

### 3.4 [참고] syncFromToken 미사용

- **현황**: `authStore`에 `syncFromToken()`이 정의돼 있지만 프로젝트 어디에서도 호출하지 않음. OAuth 콜백은 `window.location.replace`로 전체 새로고침하므로, 현재 플로우에서는 토큰 반영이 초기 마운트 시 일어남.
- **제안**: 특별히 같은 탭에서 토큰만 갱신하는 시나리오가 생기면 (예: silent refresh) 그때 `syncFromToken()` 호출을 추가하면 됨. 당장 수정 필수는 아님.

### 3.5 [선택] Apply에서 토큰 접근 방식

- **현황**: Apply.jsx에서 `localStorage.getItem('accessToken')`을 직접 사용. 라우트 자체가 이미 `isLoggedIn ? <Apply />`로 보호되어 있어 기능상 문제는 없음.
- **제안**: 일관성을 위해 `useAuth().isLoggedIn`으로 분기하고, API 호출은 axios가 이미 토큰을 붙이므로 토큰 체크만 하면 될 경우 `isLoggedIn` 사용 가능. 낮은 우선순위.

---

## 4. 수정 시 우선순위 제안

1. **ProfileSetup 성공 시 `setUserName(formData.name)` 호출** — 변경 범위 작고, 최초 가입 후 네비 표시가 바로 맞춰짐.
2. **앱 로드 시(로그인된 경우) GET /api/member/me로 `setUserName` 호출** — 새로고침·재진입 시 "OO 님"이 맞게 표시됨.
3. **MyProfile fetchMyInfo 성공 시 `setUserName(data.name)` 호출** — 2번을 하면 선택 사항.
4. 나머지(syncFromToken, Apply 토큰 접근)는 필요 시 추가.

---

## 5. 요약

- **회원 정보**는 authStore(useAuth)의 `userRole`, `isLoggedIn`, `userName`으로 전역 관리되며, **이름 수정은 MyProfile 저장 시에만 store에 반영**되어 네비에 즉시 표시됨.
- **즉시 반영이 안 되는 경우**: 앱 첫 로드/새로고침 시 이름, ProfileSetup 성공 직후 이름, MyProfile만 열고 저장 안 했을 때 이름.  
  위 3.1~3.3 반영 시 전반적으로 "수정하면 즉시 반영"되도록 정리할 수 있음.

---

## 6. 차후 수정 가이드 (회원 정보 조회 API 연동 시)

위 **0. 회원 정보 조회 API**가 구현되면, 아래 순서대로 프론트를 수정하면 된다.

### 6.1 API 경로·호출 방식 확정

- 백엔드와 **실제 경로** 확정 (예: `GET /api/member/me` 유지 여부).
- axios 인스턴스(`getit-web/src/api/axios.js`)가 이미 요청 시 `Authorization: Bearer` 를 붙이므로, **별도 헤더 설정 없이** `api.get('/api/member/me')` 만 호출하면 됨.

### 6.2 앱 로드 시 회원 정보 동기화 (이름·역할)

**목적**: 새로고침·재진입 시 네비에 "OO 님"과 역할이 서버 기준으로 표시되도록.

**수정 위치**: `getit-web/src/App.jsx`

- `useAuth()` 에서 `setUserName`, `setUserRole` 도 가져옴.
- `useEffect` 추가: `isLoggedIn === true` 일 때만 한 번 `GET /api/member/me` (또는 확정된 경로) 호출.
- 응답에서:
  - `setUserName(data.name ?? null)` 호출.
  - (선택) 서버 role을 우선하고 싶으면 `setUserRole(data.role)` 호출.  
    - 이때 `authStore`의 `normalizeRole`이 이미 `ROLE_GUEST` / `ROLE_MEMBER` / `ROLE_ADMIN` 형태를 처리하므로, 백엔드가 동일한 문자열을 주면 그대로 사용 가능.
- 에러 시(401 등)는 axios 인터셉터에서 이미 처리하므로, 여기서는 별도 처리 없거나, 실패 시 그냥 store는 JWT 기준으로 두면 됨.
- 의존성 배열: `[isLoggedIn]` 으로 두어, 로그인 시에만 1회 호출.

**또는** 전용 훅으로 분리:

- `getit-web/src/hooks/useSyncMemberInfo.js` 같은 훅 생성.
- 내부에서 `isLoggedIn` 이 true일 때 `api.get('/api/member/me')` 호출 후 `setUserName`(및 필요 시 `setUserRole`) 호출.
- `App.jsx` 에서 해당 훅만 호출하도록 하면 App이 짧게 유지됨.

### 6.3 MyProfile 연동

**위치**: `getit-web/src/pages/Member/MyProfile/index.jsx`

- 이미 `GET /api/member/me` 로 폼을 채우고 있음. **응답 필드명**이 위 API 스펙과 같다면 (`name`, `studentId`, `college`, `department`, `cellNum`) 수정 없이 사용 가능.
- 백엔드가 다른 키를 쓰면 `setFormData` 매핑만 응답 구조에 맞게 수정.
- **추가 권장**: `fetchMyInfo` 성공 시 `setUserName(data.name ?? null)` 호출해, MyProfile 진입만 해도 네비에 이름이 반영되도록 할 수 있음 (6.2를 하면 중복이지만 해도 무방).

### 6.4 ProfileSetup 연동

**위치**: `getit-web/src/pages/Auth/ProfileSetup/index.jsx`

- 최초 정보 등록은 `POST /api/member/info` 유지.
- **수정**: `handleSubmit` 에서 POST 성공 시 `setUserName(formData.name)` 호출 후 `navigate('/')`.  
  → 최초 가입 후 홈으로 돌아갔을 때 네비에 이름이 바로 표시됨.

### 6.5 응답 필드 매핑 요약

| API 응답 필드 | 프론트 사용처 |
|---------------|----------------|
| `name` | `setUserName(name)` → 네비 "OO 님" |
| `role` | (선택) `setUserRole(role)` → 메뉴/라우트 가드 |
| `hasInfo` | RedirectHandler 등에서 profileSetup 리다이렉트 조건에 활용 가능 |
| `studentId`, `college`, `department`, `cellNum` | MyProfile 폼, ProfileSetup 폼과 동일 이름으로 매핑 |

### 6.6 정리

1. **API 경로** 확정 후, 앱 로드 시 한 번 `GET` 호출해 `setUserName`(및 필요 시 `setUserRole`) 호출 (6.2).
2. **ProfileSetup** 성공 시 `setUserName(formData.name)` 호출 (6.4).
3. **MyProfile**은 응답 필드만 맞추고, 필요 시 fetch 성공 시 `setUserName` 호출 (6.3).
4. 이렇게 하면 solve.md 2·3절에서 정리한 "즉시 반영" 이슈가 해소됨.
