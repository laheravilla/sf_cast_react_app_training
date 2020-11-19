import React from "react";
import { render } from "react-dom";
import RepLogApp from "./RepLog/RepLogApp";

const shouldShowTitle = true;

render(
    <RepLogApp withTitle={shouldShowTitle} />,
    document.getElementById("lift-stuff-app")
);
