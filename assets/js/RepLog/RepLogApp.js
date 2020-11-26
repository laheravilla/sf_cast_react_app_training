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
                { id: uuidv4(), reps: 10, itemLabel: "Big Fat Cat", totalWeight: 180 },
                { id: uuidv4(), reps: 4, itemLabel: "Big Fat Cat", totalWeight: 72 }
            ],
            numberOfHearts: 1
        }

        // This binding is necessary to make `this` work in the callback
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        // Whoever calls this method will always refer to this instance
        this.handleRowMouseOver = this.handleRowMouseOver.bind(this);
    }

    handleRowMouseOver(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(itemLabel, reps) {
        const newRep = {
            id: uuidv4(),
            itemLabel,
            reps,
            totalWeight: Math.floor(Math.random() * 50)
        };

        // If new state depends on current state then...
        // Avoid mutate state by cloning object
        // When returning an object in a arrow function we use "()" around the object
        this.setState(state => ( {repLogs: [...state.repLogs, newRep] }) );
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowMouseOver={this.handleRowMouseOver}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
            />
        );
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
};