import React from "react";
import PropTypes from 'prop-types';
import {RIETextArea} from "riek";

class DescriptionField extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    
    onUpdate = (formData) => {
        console.log(formData);
        this.setState(formData);
    }

    render() {
        return (
            <RIETextArea
                className="edit-in-place"
                classEditing="edit-in-place-active"
                propName="description"
                value={this.state.description}
                change={this.onUpdate} />
        );
    }
}


DescriptionField.propTypes = {
    description: PropTypes.string
}


export default DescriptionField
