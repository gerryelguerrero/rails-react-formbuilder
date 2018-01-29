import React from "react";
import PropTypes from "prop-types"
import {RIEInput} from "riek";

function TitleField(props) {
    const onUpdate = function(formData) {
        console.log(formData);
    }
  
    return (
        <RIEInput
            className="edit-in-place"
            propName="title"
            value={props.title}
            change={onUpdate} />
    );
}

TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool
}

export default TitleField