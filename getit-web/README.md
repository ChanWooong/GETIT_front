# React + Vite

## 모집 기간 / 타임존 (Recruitment period)

- **프론트**: 관리자 설정에서는 **한국 시간(KST)** 만 입력·표시합니다. 저장 시 `"YYYY-MM-DDTHH:mm:00"` 형식의 한국 시간 그대로 `PATCH /api/recruitment/status`로 전달합니다.
- **백엔드**: 서버는 받은 한국 시간에서 **10시간을 뺀 값**으로 저장·비교합니다. GET 시에는 그 저장값(KST−10)을 그대로 내려주면 되고, 프론트에서 10시간을 더해 다시 한국 시간으로 표시합니다.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
