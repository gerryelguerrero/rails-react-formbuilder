import React from "react";
import PropTypes from 'prop-types';
import {RIEInput} from "riek";

function DescriptionField(props) {
    const onUpdate = function(formData) {
        console.log(formData);
    };

    const {id, description=""} = props;
    return (
        <p id={id}>
            <RIEInput
            className="edit-in-place"
            classEditing="edit-in-place-active"
            propName="description"
            value={description}
            change={onUpdate} />
        </p>
    );
}


DescriptionField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
};


export default DescriptionField;
