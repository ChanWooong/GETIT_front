# React + Vite

## 모집 기간 / 타임존 (Recruitment period)

- **프론트**: 관리자 설정 화면에서 입력하는 시작/종료 시간은 **한국 시간(KST)** 기준입니다. 저장 시 UTC ISO 8601(`...Z`)로 변환해 `PATCH /api/recruitment/status`로 전달합니다.
- **백엔드 권장**: `startAt`, `endAt`을 UTC 기준으로 저장하고, `isOpen` 판단 시 **현재 시각을 UTC로 비교**하면 서버(시드니)와 프론트(버셀) 위치와 관계없이 동일하게 동작합니다. GET 시에는 `startAt`, `endAt`을 ISO 8601 UTC 문자열로 내려주면 프론트에서 KST로 변환해 표시합니다.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
