import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: uuidv4(), reps: 25, itemLabel: "My Laptop", totalWeight: 112.5 },
                { id: uuidv4(), reps: 10, itemLabel: "Big fat Cat", totalWeight: 180 },
                { id: uuidv4(), reps: 4, itemLabel: "Big fat Cat", totalWeight: 72 }
            ]
        }
        // Whoever calls this method will always refer to this instance
        this.handleRowMouseOver = this.handleRowMouseOver.bind(this);
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    }

    handleRowMouseOver(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleNewItemSubmit(itemLabel, reps) {
        const repLogs = this.state.repLogs;
        const newRep = {
            id: uuidv4(),
            itemLabel,
            reps,
            totalWeight: Math.floor(Math.random() * 50)
        };

        repLogs.push(newRep);
        this.setState({repLogs});
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowMouseOver={this.handleRowMouseOver}
                onNewItemSubmit={this.handleNewItemSubmit}
            />
        );
    }
}

RepLogApp.propTypes = {
    withTitle: PropTypes.bool
};