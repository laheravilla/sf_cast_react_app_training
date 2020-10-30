import React from "react";
import ReactDom from "react-dom";

const elem = React.createElement(
    "h2",
    null,
    "Hello world!",
    React.createElement(
        "span",
        null,
        " <3"
    )
);

console.log(elem);

ReactDom.render(elem, document.getElementById("lift-stuff-app"));
