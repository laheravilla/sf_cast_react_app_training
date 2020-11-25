import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from "prop-types";
import RepLogCreator from "./RepLogCreator";

/**
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
 * @example arr.reduce(callback, valeurInitiale)
 */
const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, log) => total + log.totalWeight, 0);

export default function repLogs(props) {
    const {
        withTitle,
        highlightedRowId,
        onRowMouseOver,
        repLogs,
        onAddRepLog
    } = props;

    let title = "";

    if (withTitle) {
        title = <strong>Lift History</strong>;
    }

    return (
        <div className="col-md-7">
            <h2>
                {title}
            </h2>
            <hr/>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    onRowMouseOver={onRowMouseOver}
                    repLogs={repLogs}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeightLifted(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>

            <RepLogCreator
                onAddRepLog={onAddRepLog}
            />
        </div>
    );
}

repLogs.propTypes = {
    withTitle: PropTypes.bool.isRequired,
    highlightedRowId: PropTypes.any,
    onRowMouseOver: PropTypes.func.isRequired, // Make it required
    onAddRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};