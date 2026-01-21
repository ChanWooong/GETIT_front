import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MessageCircle, Share2, ThumbsUp, CheckCircle, Send } from 'lucide-react';

const LectureDetail = ({ userRole }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
      
      {/* 1. 상단 네비게이션 */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center gap-4 animate-fade-in-down">
        <button 
          onClick={() => navigate('/lecture')}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <span className="text-cyan-400 text-xs font-bold tracking-wider">WEEK 1</span>
          <h2 className="text-xl md:text-2xl font-bold truncate">웹 동작 원리와 HTTP 통신</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* [좌측] 영상 플레이어 & 정보 */}
        <div className="lg:col-span-2 space-y-6 animate-fade-in-up">
          
          <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center relative group">
            <div className="text-center z-10">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer">
                 <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <p className="text-gray-500 text-sm">Video Player Area</p>
              <p className="text-cyan-400 font-bold font-mono mt-1">Lecture ID: {id}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
               <div className="w-1/3 h-full bg-red-600 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform"></div>
               </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              웹 브라우저는 어떻게 화면을 그릴까? (Rendering Process)
            </h1>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">
                  TE
                </div>
                <div>
                  <p className="font-bold flex items-center gap-1">
                    Tech Education Team 
                    <CheckCircle size={14} className="text-cyan-400" />
                  </p>
                  <p className="text-xs text-gray-400">2026.03.14 업로드 • 조회수 1,240회</p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm border border-white/5">
                  <ThumbsUp size={16} /> 좋아요
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm border border-white/5">
                  <Share2 size={16} /> 공유
                </button>
              </div>
            </div>

            <div className="mt-6 bg-[#161229] p-6 rounded-xl border border-white/5">
              <h3 className="font-bold mb-3 text-lg text-gray-200">강의 소개</h3>
              <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                이번 강의에서는 우리가 매일 사용하는 웹 브라우저가 실제로 어떻게 서버와 통신하고, 받아온 데이터를 화면에 그려내는지(Rendering) 그 과정을 상세하게 뜯어봅니다.
              </p>
              <div className="mt-4 flex gap-2 flex-wrap">
                 <span className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded">#HTTP</span>
                 <span className="text-xs bg-cyan-900/30 text-cyan-400 px-2 py-1 rounded">#Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* [우측] 자료 & 채팅 */}
        <div className="lg:col-span-1 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          
          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <Download size={18} className="text-cyan-400" /> 강의 자료
            </h3>
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 border border-transparent transition-all text-sm text-left">
                <div className="flex items-center gap-3">
                   <div className="bg-red-500/20 p-2 rounded text-red-400"><Download size={16}/></div>
                   <span>1주차_강의안.pdf</span>
                </div>
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 border border-transparent transition-all text-sm text-left">
                <div className="flex items-center gap-3">
                   <div className="bg-blue-500/20 p-2 rounded text-blue-400"><Download size={16}/></div>
                   <span>실습_코드_v1.zip</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl h-[500px] flex flex-col shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4 text-gray-200">
              <MessageCircle size={18} className="text-green-400" /> 실시간 Q&A
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs">김</div>
                <div className="max-w-[85%]">
                  <p className="text-xs text-gray-400 mb-1 ml-1">김철수 (8기)</p>
                  <p className="text-sm bg-[#1f1b36] p-3 rounded-2xl rounded-tl-none text-gray-200 border border-white/5">
                    HTTP랑 HTTPS 차이가 정확히 뭔가요?
                  </p>
                </div>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-full bg-cyan-600 flex-shrink-0 border-2 border-[#110b29] flex items-center justify-center text-xs font-bold shadow-lg">M</div>
                 <div className="text-right max-w-[85%]">
                    <p className="text-xs text-cyan-400 font-bold mb-1 mr-1 flex items-center justify-end gap-1">
                      GET IT 운영진 <CheckCircle size={10} />
                    </p>
                    <p className="text-sm bg-gradient-to-br from-cyan-900/80 to-blue-900/80 border border-cyan-500/30 p-3 rounded-2xl rounded-tr-none text-white shadow-md text-left">
                       암호화 전송 차이입니다!
                    </p>
                 </div>
              </div>
            </div>

            <div className="mt-auto">
              {userRole === 'ADMIN' && (
                 <div className="text-xs text-cyan-400 mb-2 font-bold flex items-center gap-1 animate-pulse">
                    <CheckCircle size={12} /> 운영진 계정으로 답변 작성 중
                 </div>
              )}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={userRole === 'ADMIN' ? "답변을 입력하세요..." : "질문을 남겨보세요..."}
                  className={`w-full bg-black/30 border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none transition-all placeholder-gray-600 ${
                    userRole === 'ADMIN' 
                      ? 'border-cyan-500/50 focus:border-cyan-400 focus:bg-cyan-900/10' 
                      : 'border-white/10 focus:border-cyan-500 focus:bg-white/5'
                  }`}
                />
                <button className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    userRole === 'ADMIN' ? 'text-cyan-400 hover:bg-cyan-500/20' : 'text-gray-400 hover:bg-white/10'
                }`}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LectureDetail;