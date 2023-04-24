import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

let initialTasks = {};
if (localStorage.calendarTasks) {
  initialTasks = JSON.parse(window.localStorage.getItem("calendarTasks"));
}

root.render(
  <StrictMode>
    <App initialTasks={initialTasks} />
  </StrictMode>
);
