export default function TinyList({ props }) {
  const { year, monthName, date, allTasks } = props;
  if (
    year in allTasks &&
    monthName in allTasks[year] &&
    date in allTasks[year][monthName]
  ) {
    return (
      <div className="tinyTaskList">
        {allTasks[year][monthName][date].map((x, index) => (
          <small className="tinyTask" key={index + x.text + x.time}>
            {x.text.length > 16 ? x.text.substring(0, 14) + "..." : x.text}
          </small>
        ))}
      </div>
    );
  }
}
