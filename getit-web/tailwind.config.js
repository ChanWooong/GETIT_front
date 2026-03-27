/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // projects.json 등에서 동적으로 쓰는 그라데이션 클래스는 소스에 안 보이므로 safelist로 포함
  safelist: [
    "from-sky-500", "to-cyan-500",
    "from-purple-500", "to-indigo-500",
    "from-emerald-500", "to-teal-500",
    "from-blue-500",
    "from-orange-500", "to-red-500",
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