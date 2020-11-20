import React from "react";
import PropTypes from "prop-types";

// Presentational, stateless component. Receives and print data
export default function repLogList(props) {
    const { highlightedRowId, onRowMouseOver, repLogs } = props;

    return (
        <tbody>
        {repLogs.map(repLog => (
            // Each outer element must have a unique key
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? "info" : ""}
                onMouseOver={() => onRowMouseOver(repLog.id)}
            >
                <td>{repLog.itemLabel}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.totalWeight}</td>
                <td>...</td>
            </tr>
        ))}
        </tbody>
    );
}

repLogList.propTypes = {
    // By default, props are optional
    highlightedRowId: PropTypes.any,
    onRowMouseOver: PropTypes.func.isRequired, // Make it required
    repLogs: PropTypes.array.isRequired
};
