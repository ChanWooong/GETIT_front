import { useState } from "react";
import { Mail } from "lucide-react";

/** 모바일(iOS 등)에서 Clipboard API가 안 될 때 쓰는 폴백 */
function fallbackCopyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "0";
  textarea.style.top = "0";
  textarea.style.width = "2em";
  textarea.style.height = "2em";
  textarea.style.padding = "0";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.boxShadow = "none";
  textarea.style.background = "transparent";
  textarea.style.fontSize = "16px"; /* iOS 포커스 줌 방지 */
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  try {
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch (e) {
    document.body.removeChild(textarea);
    return false;
  }
}

function EmailButton({ email }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      let success = false;
      if (navigator?.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(email);
          success = true;
        } catch (e) {
          // 모바일 등에서 실패 시 폴백
        }
      }
      if (!success) {
        success = fallbackCopyToClipboard(email);
      }
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("이메일 복사 실패:", error);
    }
  };

  return (
    <button
      type="button"
      aria-label={`이메일 주소 ${email} 복사`}
      title="이메일 복사"
      onClick={handleCopy}
      className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/20 active:bg-white/25 hover:text-cyan-400 text-gray-400 transition-all relative touch-manipulation"
    >
      <Mail size={18} />
      {copied && (
        <span role="status" aria-live="polite" className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 text-xs bg-cyan-400 text-black rounded whitespace-nowrap z-10">
          복사됨!
        </span>
      )}
    </button>
  );
}

export default EmailButton;
