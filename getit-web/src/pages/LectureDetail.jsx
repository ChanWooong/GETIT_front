import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

const LectureDetail = () => {
  const { id } = useParams(); // URL에서 강좌 ID를 가져옴 (나중에 DB 연동 시 사용)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
      
      {/* 상단 네비게이션 (뒤로가기) */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center gap-4">
        <button 
          onClick={() => navigate('/lecture')}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold truncate">1주차: 웹 동작 원리와 HTTP 통신</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 🔥 좌측: 메인 영상 플레이어 (가장 크게) */}
        <div className="lg:col-span-2">
          {/* 영상 영역 (16:9 비율 유지) */}
          <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center relative group">
            {/* 실제 영상 대신 플레이스홀더 */}
            <div className="text-center">
              <p className="text-gray-500 mb-2">Video Player Area</p>
              <p className="text-cyan-400 font-bold text-2xl">Lecture ID: {id}</p>
            </div>
            {/* 유튜브처럼 하단 컨트롤러 흉내 */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
               <div className="w-1/3 h-full bg-red-600"></div>
            </div>
          </div>

          {/* 영상 하단 정보 */}
          <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">웹 브라우저는 어떻게 화면을 그릴까?</h1>
            
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold">
                  TE
                </div>
                <div>
                  <p className="font-bold">Tech Education Team</p>
                  <p className="text-xs text-gray-400">2024.03.14 업로드</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  <ThumbsUp size={16} /> 좋아요
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm">
                  <Share2 size={16} /> 공유
                </button>
              </div>
            </div>

            {/* 강의 설명 */}
            <div className="mt-6 bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="font-bold mb-2 text-lg">강의 소개</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                이번 강의에서는 우리가 매일 사용하는 웹 브라우저가 실제로 어떻게 서버와 통신하고, 
                받아온 데이터를 화면에 그려내는지(Rendering) 그 과정을 상세하게 뜯어봅니다.<br /><br />
                DNS 조회부터 TCP/IP 연결, HTTP 요청과 응답 구조까지! 백엔드 개발자가 되기 위한 첫 걸음을 시작하세요.
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 우측: 사이드 패널 (채팅, 자료, 커리큘럼 등) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* 1. 강의 자료 다운로드 */}
          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Download size={18} className="text-cyan-400" /> 강의 자료
            </h3>
            <div className="space-y-2">
              <button className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors text-left">
                <span>📄 1주차_강의안.pdf</span>
                <Download size={14} className="text-gray-500" />
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 text-sm transition-colors text-left">
                <span>💻 실습_코드_v1.zip</span>
                <Download size={14} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* 2. 질문 게시판 (채팅창 느낌) */}
          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl h-[400px] flex flex-col">
            <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              <MessageCircle size={18} className="text-green-400" /> Q&A Chat
            </h3>
            
            {/* 채팅 목록 (스크롤) */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">김철수 (8기)</p>
                  <p className="text-sm bg-white/5 p-2 rounded-lg rounded-tl-none">
                    HTTP랑 HTTPS 차이가 정확히 뭔가요? 보안 인증서 차이인가요?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-full bg-cyan-600 flex-shrink-0"></div>
                 <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">교육팀장</p>
                    <p className="text-sm bg-cyan-900/50 p-2 rounded-lg rounded-tr-none text-left">
                       네 맞습니다! SSL 핸드쉐이크 과정이 추가되면서 데이터가 암호화되어 전송됩니다. 영상 24:30 부분을 참고해주세요!
                    </p>
                 </div>
              </div>
            </div>

            {/* 입력창 */}
            <div className="mt-auto">
              <input 
                type="text" 
                placeholder="질문을 남겨보세요..." 
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LectureDetail;