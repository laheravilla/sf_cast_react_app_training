import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from "prop-types";

/**
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
 * @example arr.reduce(callback, valeurInitiale)
 */
const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, log) => total + log.totalWeight, 0);

export default function repLogs(props) {
    const { withTitle, highlightedRowId, onRowMouseOver, repLogs, onNewItemSubmit } = props;
    let title = "";

    if (withTitle) {
        title = <strong>Lift History</strong>;
    }

    const handleFormSubmit = (Event) => {
        Event.preventDefault();
        console.log("Form submission!");
        onNewItemSubmit('Big Fat Cat', Event.target.elements.namedItem("reps").value);
    };

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

            <form className="form-inline" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            name="item"
                            required="required"
                            className="form-control"
                            defaultValue="fat_cat" // Set default value here instead of in option
                    >
                        <option value="">What did you lift?</option>
                        <option value="cat">Cat</option>
                        <option value="fat_cat">Big Fat Cat</option>
                        <option value="laptop">My Laptop</option>
                        <option value="coffee_cup">Coffee Cup</option>
                    </select>
                </div>
                {" "}
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input type="number" id="rep_log_reps"
                           name="reps" required="required"
                           placeholder="How many times?"
                           className="form-control"/>
                </div>
                {" "}
                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        </div>
    );
}

repLogs.propTypes = {
    withTitle: PropTypes.bool.isRequired,
    highlightedRowId: PropTypes.any,
    onRowMouseOver: PropTypes.func.isRequired, // Make it required
    onNewItemSubmit: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};