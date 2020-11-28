import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { getRepLogs } from "../api/rep_log_api";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        getRepLogs();

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false
        }

        // This binding is necessary to make `this` work in the callback
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        // Whoever calls this method will always refer to this instance
        this.handleRowMouseOver = this.handleRowMouseOver.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    // Lifecycle method called right after component is rendered to the DOM
    componentDidMount() {
        getRepLogs().then(data => this.setState({
            repLogs: data,
            isLoaded: true
        }));
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

    handleDeleteRepLog(id) {
        // Remove the rep log without mutating state
        // by filtering. This will return a new array
        this.setState(prevState => (
            { repLogs: prevState.repLogs.filter(item => item.id !== id) }
            )
        );
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowMouseOver={this.handleRowMouseOver}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        );
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
};