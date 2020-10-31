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
            </div>
        );
    }
}