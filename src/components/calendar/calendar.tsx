import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "@fullcalendar/core/index.css";
// import "@fullcalendar/daygrid/index.css";
import "@fullcalendar/core/index.js";

export default function Calendar() {
  return (
    // <div className="rounded-xl border bg-white p-4 shadow-sm">
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
      <FullCalendar
        // height="auto"
        contentHeight="auto"
        expandRows={true}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
      />
    </div>
    </div>
  );
}
