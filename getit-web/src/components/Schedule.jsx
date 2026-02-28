import React from "react";
import { Calendar } from "lucide-react";

function Schedule(props) {
  const scheduleList = props.scheduleList; // 부모 컴포넌트에서 일정 데이터를 받아옵니다.
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
        <Calendar className="text-cyan-400" />
        GETIT {props.semester}학기 일정
      </h3>
      <p className="text-center text-gray-400 mb-10">
        GET IT {props.semester}학기 행사입니다.
        <br />* 일정은 상황에 따라 변경될 수 있습니다.
      </p>

      <div className="space-y-4">
        {scheduleList && scheduleList.length > 0 ? scheduleList.map((item, index) => ( // Check if scheduleList is valid
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="min-w-[100px] font-bold text-cyan-400 mb-2 md:mb-0">
              {item.date || '날짜 없음'}
            </div>
            <div className="flex-1 font-medium text-white mb-2 md:mb-0">
              {item.topic || '주제 없음'}
            </div>
            <div>
              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  item.type === "Offline"
                    ? "border-blue-500 text-blue-400"
                    : item.type === "Online"
                      ? "border-green-500 text-green-400"
                      : "border-purple-500 text-purple-400 font-bold"
                }`}
              >
                {item.type || '유형 없음'}
              </span>
            </div>
          </div>
        )) : <p className="text-center text-gray-400">일정이 없습니다.</p>}
      </div>
    </div>
  );
}

export default Schedule;
