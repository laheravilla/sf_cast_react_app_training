import React from "react";
import PropTypes from "prop-types";

// Presentational, stateless component. Receives and print data
export default function repLogList(props) {
    const { highlightedRowId, onRowMouseOver, onDeleteRepLog, repLogs, isLoaded, isSavingNewRepLog } = props;
    const handleDeleteClick = (Event, repLogId) => {
        Event.preventDefault();
        onDeleteRepLog(repLogId);
    };

    if (!isLoaded) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center">Loading...</td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody>
        {repLogs.map(repLog => (
            // Each outer element must have a unique key
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? "info" : ""}
                onMouseOver={() => onRowMouseOver(repLog.id)}
                style={{
                    opacity: repLog.isDeleting ? .3 : 1
                }}
            >
                <td>{repLog.itemLabel}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.totalWeightLifted}</td>
                <td>
                    <a href="#" onClick={(Event) => handleDeleteClick(Event, repLog.id)}>
                        <span className="fa fa-trash"/>
                    </a>
                </td>
            </tr>
        ))}
        {isSavingNewRepLog && (
            <tr>
                <td
                    colSpan="4"
                    className="text-center"
                    style={{
                        opacity: .5
                    }}
                >Lifting to the database...</td>
            </tr>
        )}
        </tbody>
    );
}

repLogList.propTypes = {
    // By default, props are optional
    highlightedRowId: PropTypes.any,
    onRowMouseOver: PropTypes.func.isRequired, // Make it required
    repLogs: PropTypes.array.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired
};
