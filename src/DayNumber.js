export default function DayNumber({ year, month, date }) {
  return (
    <small
      style={
        date === new Date().getDate() &&
        month.substring(0, 3) === new Date().toDateString().split(" ")[1] &&
        year === new Date().getFullYear()
          ? { background: "rgb(248, 242, 148)" }
          : null
      }
      className="dateNumber"
    >
      {date}
    </small>
  );
}
