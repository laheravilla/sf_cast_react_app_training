import React, { Component } from "react";
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null
        }
        // Whoever calls this method will always refer to this instance
        this.handleRowMouseOver = this.handleRowMouseOver.bind(this);
    }

    handleRowMouseOver(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        const { highlightedRowId } = this.state;
        const { withTitle } = this.props;

        return (
            <RepLogs
                withTitle={withTitle}
                highlightedRowId={highlightedRowId}
                onRowMouseOver={this.handleRowMouseOver}
            />
        );
    }
}

RepLogApp.propTypes = {
    withTitle: PropTypes.bool
};