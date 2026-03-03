import React from "react";
import { Instagram } from "lucide-react";
import EmailButton from "./EmailButton";

const Footer = () => {
  return (
    <div className="mt-24 text-center border-t border-white/10 pt-16">
          <p className="text-gray-400 mb-6">
            운영진에게 궁금한 점이 있으신가요? 언제든지 연락주세요!
          </p>
          <div className="flex items-center justify-center gap-4">
            <EmailButton email="getit0official@gmail.com" />
            <a
              href="https://www.instagram.com/knu_get_it/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-cyan-400 text-gray-400 transition-all relative"
            >
              <Instagram size={18} />
            </a>
          </div>
      </div>
  );
}

export default Footer;