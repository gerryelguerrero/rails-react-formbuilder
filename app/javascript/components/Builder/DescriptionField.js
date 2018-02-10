import React from "react";
import PropTypes from 'prop-types';
import {RIEInput} from "riek";

class DescriptionField extends React.Component {
    constructor(props) {
        super(props)
        this.state = props;
    }

    onUpdate(formData) {
        this.setState(formData);
        this.state.formContext.updateFormDescription(formData);
    }

    render() {
        const { id, description=""} = this.state;

        return (
            <p id={id}>
                <RIEInput
                    className="edit-in-place"
                    classEditing="edit-in-place-active"
                    propName="description"
                    value={description}
                    change={this.onUpdate.bind(this)} />
            </p>
        );
    }
}



DescriptionField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
}


export default DescriptionField

// function DescriptionField(props) {    
//     const onUpdate = function(formData) {
//         console.log(formData);
//         this.setState(formData);
//     }

//     const { id, description=""} = props;
//     return (
//     <p id={id}>
//         <RIEInput
//             className="edit-in-place"
//             classEditing="edit-in-place-active"
//             propName="description"
//             value={description}
//             change={onUpdate} />
//     </p>
//     );
// }