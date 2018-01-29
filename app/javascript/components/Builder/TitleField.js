import React from "react";
import PropTypes from "prop-types"
import {RIEInput} from "riek";

class TitleField extends React.Component {
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
            <RIEInput
                className="edit-in-place"
                propName="title"
                value={this.state.title}
                change={this.onUpdate} />
        );
    } 
}

TitleField.propTypes = {
    title: PropTypes.string
}

export default TitleField