import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, PlayCircle, AlertTriangle, FileText, 
  Upload, Check, X, Download, MessageCircle, Send 
} from 'lucide-react';
import { MESSAGES } from '../../../constants';

const LectureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // [Logic 1] 유튜브 플레이어 & 스킵 방지 상태
  // ==========================================
  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const loadTimeoutRef = useRef(null);
  const serverSavedTime = 120; // 서버에서 가져온 지난 시청 기록 (예: 120초)
  const maxWatchedTimeRef = useRef(serverSavedTime); // 실제 시청한 최대 지점
  const [showWarning, setShowWarning] = useState(false); // 경고 메시지 표시
  const [videoLoadError, setVideoLoadError] = useState(false);

  useEffect(() => {
    loadTimeoutRef.current = setTimeout(() => setVideoLoadError(true), 10000);

  const initPlayer = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    setVideoLoadError(false);
    if (playerRef.current) return; // Already initialized
    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: 'M7lc1UVf-VE',
      playerVars: {
        controls: 1,
        disablekb: 1,
        rel: 0,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
    },
    });
  };

  if (window.YT && window.YT.Player) {
    initPlayer();
  } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
  }
    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, []);

  const onPlayerReady = (event) => {
    if (serverSavedTime > 0) {
      event.target.seekTo(serverSavedTime); // 이어보기
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      startMonitoring(); // 재생 시 감시 시작
    } else {
      stopMonitoring();
    }
  };
  const warningTimerRef = useRef(null);
  // 스킵 감시 로직 (0.5초마다 체크)
  const startMonitoring = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!playerRef.current || !playerRef.current.getCurrentTime) return;

      const currentTime = playerRef.current.getCurrentTime();
      const maxTime = maxWatchedTimeRef.current;

      // 정상 시청 중 (기록 갱신)
      if (currentTime > maxTime && currentTime < maxTime + 2) {
        maxWatchedTimeRef.current = currentTime;
        setShowWarning(false);
      }
      // 스킵 시도 감지 (1초 이상 건너뜀)
      else if (currentTime > maxTime + 1.0) {
        setShowWarning(true);
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        warningTimerRef.current = setTimeout(() => setShowWarning(false), 3000);
        playerRef.current.seekTo(maxTime); // 강제 복귀
      }
    }, 500);
  };

  const stopMonitoring = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };


  // ==========================================
  // [Logic 2] 과제 파일 업로드 상태
  // ==========================================
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('IDLE'); // IDLE, UPLOADING, SUCCESS

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('IDLE');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploadStatus('UPLOADING');
    
    // [백엔드 전송 시뮬레이션]
    setTimeout(() => {
      setUploadStatus('SUCCESS');
      console.log(`파일 업로드 완료: ${selectedFile.name}`);
    }, 1500);
  };


  // ==========================================
  // [View] 화면 렌더링
  // ==========================================
  return (
    <div className="min-h-screen w-full bg-[#0a061e] text-white pt-24 pb-20 px-6 font-sans">
      
      {/* 상단 네비게이션 */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <span className="text-cyan-400 text-xs font-bold tracking-wider">WEEK 1</span>
          <h2 className="text-xl md:text-2xl font-bold">웹 동작 원리와 HTTP 통신</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ------------------------------------------------ */}
        {/* [왼쪽 - 2칸 차지] 영상 플레이어 & 강의 정보 */}
        {/* ------------------------------------------------ */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 영상 컨테이너 */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <div id="youtube-player" className="w-full h-full"></div>
            
            {/* 영상 로드 실패 */}
            {videoLoadError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-40 p-6 text-center">
                <AlertTriangle size={48} className="text-red-400 mb-4" />
                <p className="text-white font-bold text-lg">{MESSAGES.LECTURE_VIDEO_LOAD_ERROR}</p>
                <p className="text-gray-400 text-sm mt-2">네트워크를 확인하거나 잠시 후 다시 시도해 주세요.</p>
              </div>
            )}
            
            {/* 스킵 경고 오버레이 */}
            {showWarning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm animate-fade-in">
                <div className="bg-red-600/90 text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg animate-bounce">
                  <AlertTriangle size={24} className="text-yellow-300" />
                  <div>
                    <p className="font-bold">건너뛰기 불가!</p>
                    <p className="text-sm text-red-100">순서대로 학습해주세요.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 강의 제목 및 설명 */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">웹 브라우저는 어떻게 화면을 그릴까?</h1>
            <div className="bg-[#161229] p-6 rounded-xl border border-white/5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <PlayCircle size={18} className="text-cyan-400"/> 학습 가이드
              </h3>
              <p className="text-gray-400 text-sm">
                이 강의는 <strong>스킵 방지(Strict Mode)</strong>가 적용되어 있습니다. 
                영상을 끝까지 시청해야 과제를 제출할 수 있는 권한이 생깁니다. (현재는 테스트로 열려있음)
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* [오른쪽 - 1칸 차지] 과제 제출 & 자료 & 채팅 */}
        {/* ------------------------------------------------ */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* 1. 과제 제출 카드 (여기에 추가됨!) */}
          <div className="bg-[#110b29] border border-cyan-500/30 p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <FileText size={18} className="text-purple-400" /> 과제 제출
            </h3>

            <div className="space-y-4">
              {/* 파일 선택 박스 */}
              <div className="relative border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:bg-white/5 transition-colors group">
                <input 
                  type="file" 
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {!selectedFile ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gray-200">
                    <Upload size={24} />
                    <span className="text-sm">파일을 드래그하거나 클릭</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-cyan-400 z-20 relative">
                    <FileText size={20} />
                    <span className="text-sm truncate max-w-[150px]">{selectedFile.name}</span>
                    <button onClick={(e)=>{e.preventDefault(); setSelectedFile(null);}} className="text-gray-500 hover:text-white"><X size={14}/></button>
                  </div>
                )}
              </div>

              {/* 제출 버튼 */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === 'SUCCESS'}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                  ${uploadStatus === 'SUCCESS' 
                    ? 'bg-green-600 text-white' 
                    : !selectedFile 
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
              >
                {uploadStatus === 'UPLOADING' && '업로드 중...'}
                {uploadStatus === 'SUCCESS' && <><Check size={18}/> 제출 완료</>}
                {uploadStatus === 'IDLE' && '과제 제출하기'}
              </button>
            </div>
          </div>

          {/* 2. 강의 자료 */}
          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <Download size={18} className="text-cyan-400" /> 강의 자료
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 text-sm text-left">
                <div className="bg-red-500/20 p-2 rounded text-red-400"><Download size={14}/></div>
                <span>1주차_강의안.pdf</span>
              </button>
            </div>
          </div>

          {/* 3. 미니 채팅 (높이 줄임) */}
          <div className="bg-[#110b29] border border-white/10 p-6 rounded-2xl h-[300px] flex flex-col">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-200">
              <MessageCircle size={18} className="text-green-400" /> Q&A
            </h3>
            <div className="flex-1 bg-black/20 rounded-xl mb-3 p-3 text-xs text-gray-400">
              채팅 내용이 여기에 표시됩니다...
            </div>
            <div className="relative">
              <input type="text" placeholder="질문하기..." className="w-full bg-black/30 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-cyan-500" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"><Send size={14}/></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LectureDetail;