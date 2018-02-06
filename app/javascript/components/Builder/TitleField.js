import React from "react";
import PropTypes from "prop-types"
import {RIEInput} from "riek";

function TitleField(props) {
    const onUpdate = function(formData) {
        console.log(formData);
        this.setState(formData);
    };

    const {id, title=""} = props;
    return (
        <legend id={id}>
            <RIEInput
                className="edit-in-place"
                propName="title"
                value={title}
                change={onUpdate} />
        </legend>
    );
    
}

TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
}

export default TitleField