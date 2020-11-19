import React, {Component} from "react";

export default class RepLogList extends Component {
    render() {
        const { highlightedRowId } = this.props;

        const repLogs = [
            { id: 1, reps: 25, itemLabel: "My Laptop", totalWeight: 112.5 },
            { id: 2, reps: 10, itemLabel: "Big fat Cat", totalWeight: 180 },
            { id: 8, reps: 4, itemLabel: "Big fat Cat", totalWeight: 72 }
        ];

        return (
            <tbody>
            {repLogs.map(repLog => (
                // Each outer element must have a unique key
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? "info" : ""}
                    onMouseOver={Event => this.handleRowMouseOver(repLog.id, Event)}
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
}