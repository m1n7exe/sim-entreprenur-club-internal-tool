
"use client";

import { useState } from "react";
import Link from "next/link";
import { events } from "@/lib/events";
import type { YenEvent } from "@/lib/events";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}

function formatTime(time?: string) {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);

  return new Intl.DateTimeFormat("en-SG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(2000, 0, 1, hours, minutes));
}

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsPage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedEvent, setSelectedEvent] =
    useState<YenEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // -----------------------------
  // CALENDAR NAVIGATION
  // -----------------------------

  const previousMonth = () => {
    setCurrentDate((previousDate) => {
      return new Date(
        previousDate.getFullYear(),
        previousDate.getMonth() - 1,
        1
      );
    });
  };

  const nextMonth = () => {
    setCurrentDate((previousDate) => {
      return new Date(
        previousDate.getFullYear(),
        previousDate.getMonth() + 1,
        1
      );
    });
  };

  const goToToday = () => {
    const now = new Date();

    setCurrentDate(
      new Date(now.getFullYear(), now.getMonth(), 1)
    );
  };

  // -----------------------------
  // BUILD CALENDAR
  // -----------------------------

  const calendarCells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Complete final row so the desktop calendar looks balanced.
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  // -----------------------------
  // EVENT FILTERING
  // -----------------------------

  const upcomingEvents = [...events]
    .filter((event) => {
      const eventDate = new Date(`${event.date}T23:59:59`);
      return eventDate >= today;
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const eventsThisMonth = [...events]
    .filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);

      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month
      );
    })
    .sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);

      if (dateComparison !== 0) {
        return dateComparison;
      }

      return (a.startTime ?? "").localeCompare(b.startTime ?? "");
    });

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F1E8]">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" className="group">
            <p className="font-bold tracking-wide text-[#D4AF37]">
              SIM YEN
            </p>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600 transition group-hover:text-neutral-400">
              Internal Tools
            </p>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500 transition hover:text-[#D4AF37]"
          >
            ← Menu
          </Link>
        </div>
      </header>

      {/* PAGE TITLE */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#D4AF37]">
              03
            </span>

            <div className="h-px w-8 bg-[#D4AF37]/50" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Events
            </p>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
            Events Calendar
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500">
            Upcoming SIM Young Entrepreneur Network events, workshops,
            meetings and activities.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* UPCOMING EVENTS */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12 sm:mb-14">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Next Up
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Upcoming Events
              </h2>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-3">
              {upcomingEvents.map((event) => {
                const eventDate = new Date(
                  `${event.date}T00:00:00`
                );

                return (
                  <button
                    type="button"
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="group bg-[#101010] p-5 text-left transition hover:bg-[#151515] sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-xs text-[#D4AF37]">
                        {String(eventDate.getDate()).padStart(
                          2,
                          "0"
                        )}{" "}
                        {MONTHS[eventDate.getMonth()]
                          .slice(0, 3)
                          .toUpperCase()}
                      </p>

                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-600">
                        {event.type}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold transition group-hover:text-[#D4AF37] sm:mt-5">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-neutral-500">
                      {formatTime(event.startTime)}

                      {event.location && (
                        <>
                          <span className="mx-1.5">·</span>
                          {event.location}
                        </>
                      )}
                    </p>

                    <div className="mt-5 flex justify-end">
                      <span className="text-[#D4AF37] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* CALENDAR */}
        <section>
       {/* CALENDAR CONTROLS */}
<div className="relative z-30 border-b border-white/10 pb-6">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

    {/* CURRENT MONTH */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
        Calendar
      </p>

      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
        {MONTHS[month]}{" "}
        <span className="text-neutral-600">
          {year}
        </span>
      </h2>
    </div>

    {/* NAVIGATION */}
    <div className="relative z-40 grid w-full grid-cols-[52px_1fr_52px] gap-2 sm:flex sm:w-auto">

      {/* PREVIOUS */}
      <button
        type="button"
        aria-label="Previous month"
        onClick={() => {
          setCurrentDate((prev) => {
            return new Date(
              prev.getFullYear(),
              prev.getMonth() - 1,
              1
            );
          });
        }}
        className="
          flex h-12 touch-manipulation
          items-center justify-center
          border border-white/10
          bg-[#101010]
          text-lg text-neutral-300
          select-none
          transition
          active:border-[#D4AF37]
          active:bg-[#D4AF37]/10
          active:text-[#D4AF37]
          sm:h-11 sm:w-11
          sm:hover:border-[#D4AF37]
          sm:hover:text-[#D4AF37]
        "
      >
        ←
      </button>

      {/* TODAY */}
      <button
        type="button"
        onClick={() => {
          const now = new Date();

          setCurrentDate(
            new Date(
              now.getFullYear(),
              now.getMonth(),
              1
            )
          );
        }}
        className="
          h-12 touch-manipulation
          border border-white/10
          bg-[#101010]
          px-5
          text-xs font-bold uppercase tracking-widest
          text-neutral-300
          select-none
          transition
          active:border-[#D4AF37]
          active:bg-[#D4AF37]/10
          active:text-[#D4AF37]
          sm:h-11
          sm:hover:border-[#D4AF37]
          sm:hover:text-[#D4AF37]
        "
      >
        Today
      </button>

      {/* NEXT */}
      <button
        type="button"
        aria-label="Next month"
        onClick={() => {
          setCurrentDate((prev) => {
            return new Date(
              prev.getFullYear(),
              prev.getMonth() + 1,
              1
            );
          });
        }}
        className="
          flex h-12 touch-manipulation
          items-center justify-center
          border border-white/10
          bg-[#101010]
          text-lg text-neutral-300
          select-none
          transition
          active:border-[#D4AF37]
          active:bg-[#D4AF37]/10
          active:text-[#D4AF37]
          sm:h-11 sm:w-11
          sm:hover:border-[#D4AF37]
          sm:hover:text-[#D4AF37]
        "
      >
        →
      </button>

    </div>
  </div>
</div>

          {/* ================================= */}
          {/* MOBILE CALENDAR                   */}
          {/* ================================= */}

          <div className="mt-6 md:hidden">
            {/* DAYS */}
            <div className="grid grid-cols-7 border-b border-white/10 pb-3">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center font-mono text-[9px] font-semibold tracking-wider text-neutral-600"
                >
                  {day.charAt(0)}
                </div>
              ))}
            </div>

            {/* DATES */}
            <div className="mt-3 grid grid-cols-7 gap-y-2">
              {calendarCells.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`mobile-empty-${index}`}
                      className="aspect-square"
                    />
                  );
                }

                const dateString = getDateString(
                  year,
                  month,
                  day
                );

                const dayEvents = events.filter(
                  (event) => event.date === dateString
                );

                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();

                return (
                  <div
                    key={dateString}
                    className="flex aspect-square min-w-0 flex-col items-center justify-center"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center font-mono text-xs ${
                        isToday
                          ? "bg-[#D4AF37] font-bold text-[#080808]"
                          : "text-neutral-400"
                      }`}
                    >
                      {day}
                    </div>

                    {/* EVENT DOTS */}
                    <div className="mt-1 flex h-2 items-center justify-center gap-0.5">
                      {dayEvents.slice(0, 3).map((event) => (
                        <button
                          type="button"
                          key={event.id}
                          onClick={() =>
                            setSelectedEvent(event)
                          }
                          aria-label={`Open ${event.title}`}
                          className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE MONTH AGENDA */}
            <div className="mt-8 border-t border-white/10">
              <div className="py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                  Events this month
                </p>
              </div>

              {eventsThisMonth.length > 0 ? (
                eventsThisMonth.map((event) => {
                  const eventDate = new Date(
                    `${event.date}T00:00:00`
                  );

                  return (
                    <button
                      type="button"
                      key={event.id}
                      onClick={() =>
                        setSelectedEvent(event)
                      }
                      className="group flex w-full items-start gap-4 border-t border-white/10 py-5 text-left"
                    >
                      <div className="w-11 shrink-0">
                        <p className="font-mono text-xl font-bold text-[#D4AF37]">
                          {String(
                            eventDate.getDate()
                          ).padStart(2, "0")}
                        </p>

                        <p className="mt-0.5 font-mono text-[9px] uppercase text-neutral-600">
                          {MONTHS[eventDate.getMonth()]
                            .slice(0, 3)
                            .toUpperCase()}
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#F5F1E8]">
                          {event.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                          {formatTime(event.startTime)}

                          {event.location && (
                            <>
                              <span className="mx-1">
                                ·
                              </span>
                              {event.location}
                            </>
                          )}
                        </p>

                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                          {event.type}
                        </p>
                      </div>

                      <span className="mt-1 shrink-0 text-[#D4AF37] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="border-t border-white/10 py-10 text-center">
                  <p className="text-sm text-neutral-600">
                    No events scheduled this month.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ================================= */}
          {/* DESKTOP CALENDAR                  */}
          {/* ================================= */}

          <div className="mt-6 hidden md:block">
            {/* DAYS */}
            <div className="grid grid-cols-7 border-l border-t border-white/10">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="border-b border-r border-white/10 px-3 py-3 text-center font-mono text-[10px] tracking-widest text-neutral-600"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7 border-l border-white/10">
              {calendarCells.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`desktop-empty-${index}`}
                      className="min-h-32 border-b border-r border-white/10 bg-[#0A0A0A]"
                    />
                  );
                }

                const dateString = getDateString(
                  year,
                  month,
                  day
                );

                const dayEvents = events.filter(
                  (event) => event.date === dateString
                );

                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();

                return (
                  <div
                    key={dateString}
                    className="min-h-32 border-b border-r border-white/10 p-3 transition hover:bg-white/[0.02]"
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center font-mono text-xs ${
                        isToday
                          ? "bg-[#D4AF37] font-bold text-[#080808]"
                          : "text-neutral-500"
                      }`}
                    >
                      {day}
                    </div>

                    <div className="mt-3 space-y-2">
                      {dayEvents.map((event) => (
                        <button
                          type="button"
                          key={event.id}
                          onClick={() =>
                            setSelectedEvent(event)
                          }
                          className="w-full border-l-2 border-[#D4AF37] bg-[#D4AF37]/5 px-2 py-2 text-left transition hover:bg-[#D4AF37]/10"
                        >
                          <p className="truncate text-xs font-semibold text-[#F5F1E8]">
                            {event.title}
                          </p>

                          {event.startTime && (
                            <p className="mt-1 font-mono text-[9px] text-[#D4AF37]">
                              {formatTime(
                                event.startTime
                              )}
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-14 flex flex-col gap-2 border-t border-white/10 py-8 text-xs text-neutral-700 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>SIM Young Entrepreneur Network</p>
          <p>Events Calendar</p>
        </footer>
      </div>

      {/* ================================= */}
      {/* EVENT MODAL                       */}
      {/* ================================= */}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="max-h-[85vh] w-full overflow-y-auto border-t border-white/10 bg-[#101010] sm:max-w-xl sm:border"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between border-b border-white/10 p-5 sm:p-6">
              <div className="pr-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {selectedEvent.type}
                </p>

                <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                  {selectedEvent.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedEvent(null)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl text-neutral-600 transition hover:text-[#D4AF37]"
                aria-label="Close event"
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-5 sm:p-6">
              <div className="grid gap-5 border-b border-white/10 pb-6 sm:grid-cols-2">
                {/* DATE */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                    Date
                  </p>

                  <p className="mt-2 text-sm">
                    {formatEventDate(
                      selectedEvent.date
                    )}
                  </p>
                </div>

                {/* TIME */}
                {(selectedEvent.startTime ||
                  selectedEvent.endTime) && (
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                      Time
                    </p>

                    <p className="mt-2 text-sm">
                      {formatTime(
                        selectedEvent.startTime
                      )}

                      {selectedEvent.endTime &&
                        ` – ${formatTime(
                          selectedEvent.endTime
                        )}`}
                    </p>
                  </div>
                )}

                {/* LOCATION */}
                {selectedEvent.location && (
                  <div className="sm:col-span-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                      Location
                    </p>

                    <p className="mt-2 text-sm">
                      {selectedEvent.location}
                    </p>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              {selectedEvent.description && (
                <p className="mt-6 text-sm leading-7 text-neutral-400">
                  {selectedEvent.description}
                </p>
              )}

              {/* REGISTRATION */}
              {selectedEvent.registrationUrl && (
                <a
                  href={
                    selectedEvent.registrationUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex w-full items-center justify-center bg-[#D4AF37] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[#080808] transition hover:bg-[#E5C14B] sm:inline-flex sm:w-auto"
                >
                  Register →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
