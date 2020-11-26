import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);
        // Normally "state" is located in state components like RepLogs
        // But here "state" is not about logic but DOM creation
        this.state = {
            selectedItemId: "",
            quantityValue: 0,
            quantityInputError: ""
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleSelectedItemChange = this.handleSelectedItemChange.bind(this);
        this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
        this.itemOptions = [
            {id: "cat", text: "Cat"},
            {id: "fat_cat", text: "Big Fat Cat"},
            {id: "laptop", text: "My Laptop"},
            {id: "coffee_cup", text: "Coffee Cup"}
        ];
    }

    handleFormSubmit(Event) {
        Event.preventDefault();

        const { onAddRepLog } = this.props;
        const { selectedItemId, quantityValue } = this.state;
        const itemLabel = this.itemOptions.find(opt => opt.id === selectedItemId).text;

        // Form validation
        if (quantityValue <= 0) {
            this.setState({
                quantityInputError: "Please enter a value greater than 0"
            })
            return;
        }

        onAddRepLog(
            itemLabel,
            quantityValue
        );

        // Reset values
        this.setState({
            selectedItemId: "",
            quantityValue: 0,
            quantityInputError: ""
        })
    }

    handleSelectedItemChange(Event) {
        this.setState({
            selectedItemId: Event.target.value
        });
    }

    handleQuantityInputChange(Event) {
        this.setState({
            quantityValue: Event.target.value
        });
    }

    render () {
        const { quantityInputError, selectedItemId, quantityValue } = this.state;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            value={selectedItemId}
                            onChange={this.handleSelectedItemChange}
                            required="required"
                            className="form-control"
                    >
                        {this.itemOptions.map(option => <option value={option.id} key={option.id}>{option.text}</option>)}
                    </select>
                </div>
                {" "}
                <div className={`form-group ${quantityInputError && 'has-error'}`}>
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input type="number" id="rep_log_reps"
                           value={quantityValue}
                           onChange={this.handleQuantityInputChange}
                           required="required"
                           placeholder="How many times?"
                           className="form-control"/>
                    {quantityInputError && <span className="help-block">{quantityInputError}</span>}
                </div>
                {" "}
                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        );
    }
}

RepLogCreator.propTypes = {
    onAddRepLog: PropTypes.func.isRequired, // Make it required
};