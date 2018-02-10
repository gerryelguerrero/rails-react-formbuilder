import React from "react";
import PropTypes from "prop-types";
import {RIEInput} from "riek";

class TitleField extends React.Component {
    constructor(props) {
        super(props)
        this.state = props;
    }

    onUpdate(formData) {
        this.setState(formData);
        this.state.formContext.updateFormTitle(formData);
    }

    render() {
        const { id, title=""} = this.state;

        return (
            <legend id={id}>
                <RIEInput
                    className="edit-in-place"
                    propName="title"
                    value={title}
                    change={this.onUpdate.bind(this)} />
            </legend>
        );
    }
}

TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
    onUpdate: PropTypes.func,
}

export default TitleField


// function TitleField(props) {
//     const onUpdate = function(formData) {
        
//     };

//     const {id, title=""} = props;
//     return (
//         <legend id={id}>
//             <RIEInput
//                 className="edit-in-place"
//                 propName="title"
//                 value={title}
//                 change={onUpdate} />
//         </legend>
//     );
    
// }