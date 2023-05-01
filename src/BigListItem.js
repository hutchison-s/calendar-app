import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faTrash,
  faPen
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function BigListItem({ item, props }) {
  const {
    year,
    monthName,
    date,
    allTasks,
    setAllTasks,
    setIsNewTaskOpen,
    setIsEditable
  } = props;
  const [detailsVisible, setDetailsVisible] = useState(false);

  function convertTime(time) {
    let hrs, mins;
    [hrs, mins] = time.split(":");
    let amPM = hrs / 12 >= 1 ? "PM" : "AM";
    hrs = hrs % 12 === 0 ? 12 : hrs % 12;
    let timeString = `${hrs}:${mins} ${amPM}`;
    return timeString;
  }

  function handleDelete(item) {
    const newTasks = { ...allTasks };
    let idx = newTasks[year][monthName][date].indexOf(item);
    newTasks[year][monthName][date].splice(idx, 1);
    setAllTasks(newTasks);
  }

  function handleEdit(item) {
    setIsEditable(true);
    setIsNewTaskOpen(true);
    document.getElementById("userInput").value = item.text;
    document.getElementById("time").value = item.time;
    document.getElementById("detailsInput").value = item.details;
    handleDelete(item);
  }

  return (
    <>
      <div className="bigListItem">
        <h3>{`${item.text} - ${convertTime(item.time)}`}</h3>
        <div className="bigListItemTools">
          <span
            className="seeMore"
            onClick={() => {
              setDetailsVisible(!detailsVisible);
            }}
          >
            {detailsVisible ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </span>
          <span className="editItem">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                handleEdit(item);
              }}
            />
          </span>
          <span className="deleteItem">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleDelete(item)}
            />
          </span>
        </div>
      </div>
      {detailsVisible && <div className="detailsDisplay">{item.details}</div>}
    </>
  );
}
