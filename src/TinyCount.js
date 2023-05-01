export default function tinyCount({ props }) {
  const { year, monthName, date, allTasks } = props;
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
