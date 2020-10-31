import React from "react";
import { render } from "react-dom";
import RepLogApp from "./RepLog/RepLogApp";

const shouldShowMessage = true;

render(
    <RepLogApp message={shouldShowMessage} />,
    document.getElementById("lift-stuff-app")
);
