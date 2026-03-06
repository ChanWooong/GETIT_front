import React from "react";
import { Calendar, Star, BookOpen, Wifi } from "lucide-react";

const TYPE_CONFIG = {
  Event: { icon: Star, label: "Event", className: "border-cyan-500/50 text-cyan-400 bg-cyan-500/10" },
  Seminar: { icon: BookOpen, label: "Seminar", className: "border-blue-500/50 text-blue-400 bg-blue-500/10" },
  Online: { icon: Wifi, label: "Online", className: "border-green-500/50 text-green-400 bg-green-500/10" },
  Offline: { icon: Calendar, label: "Offline", className: "border-purple-500/50 text-purple-400 bg-purple-500/10" },
};

function Schedule(props) {
  const scheduleList = props.scheduleList ?? [];

  const isRange = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return false;
    return dateStr.includes(" – ") || dateStr.includes("–");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-1.5">
        <Calendar className="text-cyan-400" size={22} />
        GETIT {props.semester}학기 일정
      </h3>
      <p className="text-center text-gray-400 mb-5 sm:mb-8 text-xs sm:text-sm">
        GET IT {props.semester}학기 행사입니다.
        <br />
        <span className="text-gray-500">* 일정은 상황에 따라 변경될 수 있습니다.</span>
      </p>

      <div className="space-y-2 sm:space-y-3">
        {scheduleList.length > 0 ? (
          scheduleList.map((item, index) => {
            const range = isRange(item.date);
            const config = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.Event;
            const Icon = config.icon;

            return (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all ${
                  range
                    ? "bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex-shrink-0 w-full sm:w-[100px] font-semibold text-xs sm:text-sm text-cyan-400">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10">
                    {item.date || "날짜 없음"}
                  </span>
                </div>
                <div className="flex-1 font-medium text-white min-w-0 text-sm sm:text-base">
                  {item.topic || "주제 없음"}
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full border ${config.className}`}
                  >
                    <Icon size={12} />
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 py-5 text-sm">일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Schedule;
