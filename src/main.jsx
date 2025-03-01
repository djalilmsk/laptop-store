import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { reduxConfig } from "./reduxConfig.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={reduxConfig}>
    <App />
  </Provider>,
);
