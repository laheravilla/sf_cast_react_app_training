import React, { Component } from "react";
import RepLogList from "./RepLogList";

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null
        }
    }

    handleRowMouseOver(repLogId, e) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        const { highlightedRowId } = this.state;
        const { withTitle } = this.props;
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
                    <RepLogList highlightedRowId={highlightedRowId}/>
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