import "./styles.css";
import Day from "./Day";
import getMonthInfo from "./monthData";
import { useEffect, useState } from "react";
import Header from "./Header";
import Modal from "react-modal";

export default function App({ initialTasks }) {
  let date = new Date();
  const [monthInView, setMonthInView] = useState({
    year: date.getFullYear(),
    month: date.getMonth()
  });
  const { monthName, startDay, totalDays } = getMonthInfo(
    monthInView.year,
    monthInView.month
  );
  const daysInMonth = [...Array(totalDays + 1).keys()].slice(1);
  const blankDays = [];
  for (let i = 0; i < startDay; i++) {
    blankDays.push(" ");
  }
  const [allTasks, setAllTasks] = useState(initialTasks);

  useEffect(() => {
    window.localStorage.setItem(
      "calendarTasks",
      JSON.stringify({ ...allTasks })
    );
  }, [allTasks]);

  useEffect(() => {
    Modal.setAppElement("#App");
  }, []);

  return (
    <div id="App" className="App">
      <Header
        monthInView={monthInView}
        setMonthInView={setMonthInView}
        monthName={monthName}
      />
      <div className="month">
        <div className="grid-7 weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tues</div>
          <div>Wed</div>
          <div>Thurs</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid-7 dayHolder">
          {blankDays.map((x, index) => (
            <div className="blankDay" key={monthName + x + index}></div>
          ))}
          {daysInMonth.map((x, index) => (
            <Day
              date={x}
              year={monthInView.year}
              monthName={monthName}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              key={monthInView.year + monthName + index}
            />
          ))}
        </div>
      </div>
      <button
        id="todayBtn"
        onClick={() => {
          let today = new Date();
          setMonthInView({
            year: today.getFullYear(),
            month: today.getMonth()
          });
        }}
      >
        TODAY
      </button>
    </div>
  );
}
