import { useState } from "react";
import { Mail } from "lucide-react";

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      if (!navigator?.clipboard?.writeText) {
        throw new Error("클립보드 API를 사용할 수 없습니다");
      }
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후에 복사 상태 초기화
    } catch (error) {
      console.error("이메일 복사 실패:", error);
    }
  };

  return (
    <button
      type="button"
      aria-label={`이메일 주소 ${email} 복사`}
      title="CopyEmail"
      onClick={handleCopy}
      className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-cyan-400 text-gray-400 transition-all relative"
    >
      <Mail size={18} />
      {copied && (
        <span role="status" aria-live="polite" className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-cyan-400 text-black rounded whitespace-nowrap">
          복사됨!
        </span>
      )}
    </button>
  );
}

export default CopyEmail;
