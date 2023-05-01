export default function NewEventForm({ props }) {
  const {
    year,
    monthName,
    date,
    allTasks,
    setAllTasks,
    isNewTaskOpen,
    setIsNewTaskOpen,
    isEditable,
    setIsEditable
  } = props;

  function update(item) {
    const newEvents = { ...allTasks };
    newEvents[year] ??= {};
    newEvents[year][monthName] ??= {};
    newEvents[year][monthName][date] ??= [];
    newEvents[year][monthName][date] = [
      ...newEvents[year][monthName][date],
      item
    ];
    setAllTasks(newEvents);
  }

  return (
    <form
      id="newTaskForm"
      onSubmit={(e) => {
        e.preventDefault();
        let textInput = document.getElementById("userInput");
        let timeInput = document.getElementById("time");
        let detailsInput = document.getElementById("detailsInput");
        const newEvent = {
          text: textInput.value,
          time: timeInput.value,
          details: detailsInput.value
        };
        update(newEvent);
        textInput.value = "";
        timeInput.value = null;
        detailsInput.value = "";
        setIsNewTaskOpen(false);
        setIsEditable(false);
      }}
      style={
        isNewTaskOpen
          ? { transform: "scale(1)" }
          : { transform: "scale(0)", height: "0px" }
      }
    >
      <label HTMLfor="userInput">Event:</label>
      <input id="userInput" name="userInput" type="text" required />

      <label HTMLfor="time">Time:</label>
      <input id="time" name="time" type="time" required />
      <button type="submit">{isEditable ? "Save" : "Add"}</button>
      <div id="eventDetails">
        <label HTMLfor="detailsInput">Details:</label>
        <textarea id="detailsInput" name="detailsInput"></textarea>
      </div>
    </form>
  );
}
