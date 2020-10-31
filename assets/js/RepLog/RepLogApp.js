import React, { Component } from "react";

export default class RepLogApp extends Component {
    render() {
        let message = "";
        if (this.props.message) {
            message = <strong> World</strong>;
        }

        return (
            <h2>Hello {message}!</h2>
        );
    }
}