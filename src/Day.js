import Modal from "react-modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement(document.getElementById("App"));

export default function Day({ date, year, monthName, allTasks, setAllTasks }) {
  const [open, setOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  function update(item) {
    const newTasks = { ...allTasks };
    newTasks[year] ??= {};
    newTasks[year][monthName] ??= {};
    newTasks[year][monthName][date] ??= [];
    newTasks[year][monthName][date] = [
      ...newTasks[year][monthName][date],
      item
    ];
    setAllTasks(newTasks);
  }

  function convertTime(time) {
    let hrs, mins;
    [hrs, mins] = time.split(":");
    let amPM = hrs / 12 >= 1 ? "PM" : "AM";
    hrs = hrs % 12;
    let timeString = `${hrs}:${mins} ${amPM}`;
    return timeString;
  }

  function tinyList() {
    if (
      year in allTasks &&
      monthName in allTasks[year] &&
      date in allTasks[year][monthName]
    ) {
      return allTasks[year][monthName][date].map((x, index) => (
        <small className="tinyTask" key={index + x.text + x.time}>
          {x.text.length > 16 ? x.text.substring(0, 16) + "..." : x.text}
        </small>
      ));
    }
  }

  function tinyCount() {
    if (
      year in allTasks &&
      monthName in allTasks[year] &&
      date in allTasks[year][monthName] &&
      allTasks[year][monthName][date].length !== 0
    ) {
      return (
        <div className="tinyTaskCount">
          <small>{allTasks[year][monthName][date].length}</small>
        </div>
      );
    }
  }

  function bigList() {
    if (
      year in allTasks &&
      monthName in allTasks[year] &&
      date in allTasks[year][monthName]
    ) {
      const dateTasks = allTasks[year][monthName][date].sort(
        (a, b) =>
          a.time.split(":")[0] +
          a.time.split(":")[1] -
          (b.time.split(":")[0] + a.time.split(":")[1])
      );
      return dateTasks.map((x, index) => (
        <h3
          key={index + x.text + x.time}
          className="bigListItem"
          onDoubleClick={(e) => {
            const newTasks = { ...allTasks };
            newTasks[year][monthName][date] = newTasks[year][monthName][
              date
            ].filter((x) => !e.target.innerHTML.includes(x.text));
            setAllTasks(newTasks);
          }}
        >
          {`${x.text} - ${convertTime(x.time)}`}
        </h3>
      ));
    }
  }

  return (
    <div className="day" onDoubleClick={() => setOpen(true)}>
      <small
        style={
          date === new Date().getDate() &&
          monthName.substring(0, 3) ===
            new Date().toDateString().split(" ")[1] &&
          year === new Date().getFullYear()
            ? { background: "rgb(248, 242, 148)" }
            : null
        }
        className="dateNumber"
      >
        {date}
      </small>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <button id="modalClose" onClick={() => setOpen(false)}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <h3>{`Tasks for ${monthName} ${date}, ${year}`}</h3>
        <br></br>
        <div id="addTaskButton">
          <FontAwesomeIcon
            icon={faSquarePlus}
            onClick={() => {
              setIsNewTaskOpen(!isNewTaskOpen);
            }}
          />

          <form
            id="newTaskForm"
            onSubmit={(e) => {
              e.preventDefault();
              let textInput = document.getElementById("userInput");
              let timeInput = document.getElementById("time");
              const newTask = {
                text: textInput.value,
                time: timeInput.value
              };
              update(newTask);
              textInput.value = "";
              timeInput.value = null;
              setIsNewTaskOpen(false);
            }}
            style={
              isNewTaskOpen
                ? { transform: "scaleX(1)" }
                : { transform: "scaleX(0)" }
            }
          >
            <label>
              Event:
              <input id="userInput" type="text" required />
            </label>
            <label>
              Time:
              <input id="time" type="time" required />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
        <div className="bigList">{bigList()}</div>
      </Modal>
      <br></br>
      <div className="tinyTaskList">{tinyList()}</div>
      {tinyCount()}
    </div>
  );
}
