import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function Header({ monthInView, setMonthInView, monthName }) {
  function handlePreviousMonth() {
    if (monthInView.month > 0) {
      let currentMonth = { ...monthInView };
      currentMonth.month -= 1;
      setMonthInView(currentMonth);
    } else {
      let currentMonth = { ...monthInView };
      currentMonth.month = 11;
      currentMonth.year -= 1;
      setMonthInView(currentMonth);
    }
  }
  function handleNextMonth() {
    if (monthInView.month < 11) {
      let currentMonth = { ...monthInView };
      currentMonth.month += 1;
      setMonthInView(currentMonth);
    } else {
      let currentMonth = { ...monthInView };
      currentMonth.month = 0;
      currentMonth.year += 1;
      setMonthInView(currentMonth);
    }
  }

  return (
    <header>
      <button id="prevMonth" onClick={handlePreviousMonth}>
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>
      <h1>{monthName + " " + monthInView.year}</h1>
      <button id="nextMonth" onClick={handleNextMonth}>
        <FontAwesomeIcon icon={faCircleRight} />
      </button>
    </header>
  );
}
