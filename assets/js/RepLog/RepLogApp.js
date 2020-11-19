import React, { Component } from "react";

export default class RepLogApp extends Component {
    render() {
        let title = "";
        if (this.props.title) {
            title = <strong>Lift History</strong>;
        }

        const repLogs = [
            { id: 1, reps: 25, itemLabel: "My Laptop", totalWeight: 112.5 },
            { id: 2, reps: 10, itemLabel: "Big fat Cat", totalWeight: 180 },
            { id: 8, reps: 4, itemLabel: "Big fat Cat", totalWeight: 72 }
        ];

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
                    <tbody>
                    {repLogs.map(repLog => (
                        // Each outer element must have a unique key
                        <tr key={repLog.id}>
                            <td>{repLog.itemLabel}</td>
                            <td>{repLog.reps}</td>
                            <td>{repLog.totalWeight}</td>
                            <td>...</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <th>Total</th>
                            <th>TODO</th>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </table>

                <form className="form-inline" noValidate>
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
}