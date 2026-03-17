import React, { useState } from 'react';
import { Lock, Clock, ExternalLink, AlertCircle } from 'lucide-react';

const Invest = () => {
  // 🔥 나중에 아이디어톤 기간이 되면 이 값을 true로 바꾸세요!
  // 혹은 DB에서 상태를 받아오도록 수정할 수도 있습니다.
  const isLive = true; 

  // 기존 모의투자 사이트 주소 (나중에 여기에 주소만 넣으면 됩니다)
  const investSiteUrl = "https://stockgame.get-it.cloud";

  if (isLive) {
    return (
      <div className="w-full h-screen bg-[#110b29] pt-20">
        {/* 방법 1: iframe으로 내부에 띄우기 */}
        <iframe 
          src={investSiteUrl} 
          title="Invest Service"
          className="w-full h-full border-none"
        />
        
        {/* 방법 2: (iframe이 막힌 사이트라면) 버튼으로 이동시키기
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h2 className="text-3xl font-bold mb-4">투자 서비스가 오픈되었습니다!</h2>
          <a href={investSiteUrl} target="_blank" rel="noopener noreferrer" 
             className="bg-cyan-500 text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition">
            모의투자 사이트로 이동하기
          </a>
        </div> 
        */ }
      </div>
    );
  }

  // 🔒 잠김 화면 (현재 상태)
  return (
    <div className="min-h-screen bg-[#110b29] text-white flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* 배경 장식 (은은한 붉은빛으로 '경고/잠김' 느낌 주기) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-3xl text-center relative z-10 shadow-2xl">
        
        {/* 아이콘 애니메이션 */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse"></div>
          <Lock size={80} className="text-red-400 relative z-10" />
          
        </div>

        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6">
          SERVICE <span className="text-red-500">LOCKED</span>
        </h2>

        <div className="space-y-4 mb-10">
          <p className="text-xl md:text-2xl font-bold text-gray-200">
            "아이디어톤 때 접속 가능합니다"
          </p>
          <p className="text-gray-400">
            현재 모의투자 시스템 점검 및 리뉴얼 작업 중입니다.<br />
            대회가 시작되면 이 페이지가 자동으로 활성화됩니다.
          </p>
        </div>

        {/* 안내 박스 */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 text-left">
          <AlertCircle className="text-red-400 shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-red-200 text-sm">Access Restricted</h4>
            <p className="text-red-300/70 text-xs mt-1">
              관리자 외에는 접근이 불가능합니다. 오픈 알림을 받고 싶다면 동아리 디스코드 채널을 확인해주세요.
            </p>
          </div>
        </div>

        {/* (선택사항) 오픈 예정일 표시 */}
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-8 text-sm text-gray-500 font-mono">
          <div>
            <span className="block text-gray-600 text-xs mb-1">OPEN DATE</span>
            2026.00.00
          </div>
          <div>
            <span className="block text-gray-600 text-xs mb-1">STATUS</span>
            <span className="text-red-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              MAINTENANCE
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Invest;
