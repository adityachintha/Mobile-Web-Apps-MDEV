import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "../css/Calender.css"; // Import custom styles
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current month and year as a string (e.g., "October 2024")
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            <FaChevronLeft className="icon" />
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">
            <FaChevronRight className="icon" />
          </div>
        </div>
      </div>
    );
  };

  // Render days of the week (Sun, Mon, etc.)
  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEEEE"; // "Su", "Mo", etc.
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  // Render the dates for the current month
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  // Handle clicking on a date
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  // Go to the previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Go to the next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      <h1>Calender</h1>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
