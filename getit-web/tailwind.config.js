/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🔥 1. 애니메이션 이름 정의
      animation: {
        blob: "blob 7s infinite", // 7초 동안 무한 반복
      },
      // 🔥 2. 애니메이션 동작(Keyframes) 정의
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)", // 오른쪽 위로 이동 & 커짐
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)", // 왼쪽 아래로 이동 & 작아짐
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)", // 원위치
          },
        },
      },
    },
  },
  plugins: [],
}