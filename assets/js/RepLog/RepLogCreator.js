import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);
        // Normally "state" is located in state components like RepLogs
        // But here "state" is not about logic but DOM creation
        this.state = {
            quantityInputError: ""
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();
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
        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;

        // Form validation
        if (quantityInput.value <= 0) {
            this.setState({
                quantityInputError: "Please enter a value greater than 0"
            })
            return;
        }

        onAddRepLog(
            itemSelect.options[itemSelect.selectedIndex].text,
            quantityInput.value
        );

        quantityInput.value = "";
        itemSelect.selectedIndex = 0;
        this.setState({
            quantityInputError: ""
        })
    }

    render () {
        const { quantityInputError } = this.state;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            ref={this.itemSelect} // Replace [name="item"] with ref to get the element
                            required="required"
                            className="form-control"
                            defaultValue="fat_cat" // Set default value here instead of in option
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
                           ref={this.quantityInput}
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