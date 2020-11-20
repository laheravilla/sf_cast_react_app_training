import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: 1, reps: 25, itemLabel: "My Laptop", totalWeight: 112.5 },
                { id: 2, reps: 10, itemLabel: "Big fat Cat", totalWeight: 180 },
                { id: 8, reps: 4, itemLabel: "Big fat Cat", totalWeight: 72 }
            ]
        }
        // Whoever calls this method will always refer to this instance
        this.handleRowMouseOver = this.handleRowMouseOver.bind(this);
    }

    handleRowMouseOver(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowMouseOver={this.handleRowMouseOver}
            />
        );
    }
}

RepLogApp.propTypes = {
    withTitle: PropTypes.bool
};