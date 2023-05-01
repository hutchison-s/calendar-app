import BigListItem from "./BigListItem";

export default function BigList({ props }) {
  const { year, monthName, date, allTasks } = props;

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
    return (
      <div className="bigList">
        {dateTasks.map((x, index) => (
          <BigListItem item={x} key={index + x.text + x.time} props={props} />
        ))}
      </div>
    );
  }
}
