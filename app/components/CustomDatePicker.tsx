import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  name: string;
  value?: string;
  onChange: (date: Date | null, name: string) => void;
  disabled?: boolean;
}
const CustomDatePicker = ({
  name,
  value,
  onChange,
  disabled,
}: CustomDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const years = Array.from(
    { length: new Date().getFullYear() + 100 - 1900 + 1 },
    (_, index) => 1900 + index
  );
  const months = [
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

  const handleDateChange = (date: Date | null) => {
    if (date === null) {
    } else {
      setStartDate(date);
      onChange(date, name);
    }
  };

  return (
    <div className="z-10">
      <DatePicker
        disabled={disabled}
        value={value}
        name={name}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div
            style={{ margin: 10, display: "flex", justifyContent: "center" }}
          >
            <button onClick={decreaseMonth}>&lt;</button>
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(parseInt(value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth}>&gt;</button>
          </div>
        )}
        selected={startDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default CustomDatePicker;
