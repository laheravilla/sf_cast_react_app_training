import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from "prop-types";
import RepLogCreator from "./RepLogCreator";
// import RepLogCreator from "./RepLogCreatorControlledComponents";

/**
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
 * @example arr.reduce(callback, valeurInitiale)
 */
const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);

export default function repLogs(props) {
    const {
        withHeart,
        highlightedRowId,
        onRowMouseOver,
        repLogs,
        onAddRepLog,
        onHeartChange,
        onDeleteRepLog,
        numberOfHearts,
        isLoaded
    } = props;

    let heart = "";

    if (withHeart) {
        heart = Array.from(Array(numberOfHearts),(x, i) => <i className="fas fa-heart" key={i}/>);
    }

    return (
        <div className="col-md-7">
            <h2>Lift History! {heart}</h2>
            <hr/>
            <input
                type="number"
                value={numberOfHearts}
                onChange={Event => onHeartChange(+Event.target.value)}
            />

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
                    onDeleteRepLog={onDeleteRepLog}
                    isLoaded={isLoaded}
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

            <div className="row">
                <div className="col-md-6">
                    <RepLogCreator
                        onAddRepLog={onAddRepLog}
                    />
                </div>
            </div>
        </div>
    );
}

repLogs.propTypes = {
    withHeart: PropTypes.bool.isRequired,
    highlightedRowId: PropTypes.any,
    onRowMouseOver: PropTypes.func.isRequired, // Make it required
    onAddRepLog: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    isLoaded: PropTypes.bool.isRequired
};