import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import RepLogApi from "../api/RepLogApi";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: "",
            newRepLogValidationErrorMessage: "",
        }

        // Initializing
        this.repLogApi = new RepLogApi();
        this.successMessageTimeoutHandle = 0;

        // This binding is necessary to make `this` work in the callback
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        // Whoever calls this method will always refer to this instance
        this.handleRowMouseOver = this.handleRowMouseOver.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    // Lifecycle method called right after component is rendered to the DOM
    componentDidMount() {
        this.repLogApi.getRepLogs({}, data => {
            this.setState({
                repLogs: data.items,
                isLoaded: true
            });
        });
    }

    // Lifecycle method call before component is removed from DOM
    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleRowMouseOver(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(item, reps) {
        const newRep = { item, reps };
        this.setState({ isSavingNewRepLog: true });
        const newState = { isSavingNewRepLog: false };

        // If new state depends on current state then...
        // Avoid mutate state by cloning object
        // When returning an object in a arrow function we use "()" around the object
        this.repLogApi.createRepLog(newRep, repLog => {
            if (repLog.errors) {
                const firstError = Object.values(repLog.errors)[0];
                return this.setState(Object.assign({
                    newRepLogValidationErrorMessage: firstError,
                    isSavingNewRepLog: false
                }, newState)); // Merge newSte into the object without modifying existing properties
            }

            this.setState(prevState => {
                return {
                    repLogs: [...prevState.repLogs, repLog],
                    isSavingNewRepLog: false,
                    newRepLogValidationErrorMessage: "",
                    ...newState // Merge newSte into the object without modifying existing properties
                };
            });

            this.setSuccessMessage("Rep Log Saved!");
        });
    }

    setSuccessMessage(message) {

        this.setState({ successMessage: message });
        clearTimeout(this.successMessageTimeoutHandle);
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({successMessage: ""});

            this.successMessageTimeoutHandle = 0;
        }, 3000);
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleDeleteRepLog(id) {
        this.setState(prevState => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }

                    return { ...repLog, isDeleting: true };
                })
            }
        });

        this.repLogApi.deleteRepLog(id, () => {
            // Remove the rep log without mutating state
            // by filtering. This will return a new array
            this.setState(prevState => (
                    { repLogs: prevState.repLogs.filter(item => item.id !== id) }
                )
            );

            this.setSuccessMessage("Item was Un-lifted!");
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
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        );
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
    itemOptions: PropTypes.array
};

RepLogApp.defaultProps = {
    itemOptions: []
};