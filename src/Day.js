import Modal from "react-modal";
import { useState } from "react";
import DayNumber from "./DayNumber";
import NewEventForm from "./NewEventForm";
import BigList from "./BigList";
import TinyList from "./TinyList";
import TinyCount from "./TinyCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSquarePlus,
  faSquareXmark
} from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement(document.getElementById("App"));

export default function Day({ date, year, monthName, allTasks, setAllTasks }) {
  const [open, setOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const props = {
    date: date,
    year: year,
    monthName: monthName,
    allTasks: allTasks,
    setAllTasks: setAllTasks,
    isNewTaskOpen: isNewTaskOpen,
    setIsNewTaskOpen: setIsNewTaskOpen,
    isEditable: isEditable,
    setIsEditable: setIsEditable
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "90vw",
      height: "fit-content",
      maxWidth: "900px",
      minWidth: "300px",
      minHeight: "400px",
      transform: "translate(-50%, -50%)"
    }
  };

  return (
    <div className="day" onDoubleClick={() => setOpen(true)}>
      <DayNumber year={year} month={monthName} date={date} />
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
      >
        <button id="modalClose" onClick={() => setOpen(false)}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <h3 id="modalDate">{`${monthName} ${date}, ${year}`}</h3>
        <div id="addTaskBar">
          <FontAwesomeIcon
            icon={isNewTaskOpen ? faSquareXmark : faSquarePlus}
            onClick={() => {
              setIsNewTaskOpen(!isNewTaskOpen);
            }}
          />
          <NewEventForm props={props} />
        </div>
        <BigList props={props} />
      </Modal>
      <br></br>
      <TinyList props={props} />
      <TinyCount props={props} />
    </div>
  );
}
