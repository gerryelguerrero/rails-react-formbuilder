import React from "react";
import PropTypes from "prop-types";

import Form from "./Builder/Form";

import TitleField from "./Builder/TitleField";
import DescriptionField from "./Builder/DescriptionField";
import EditableField from "./Builder/EditableField";
import { updateFormTitle, updateFormDescription, addField } from "./actions/fieldlist"

class Builder extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = () => {}

  render () {
    // const INITIAL_STATE = {
    //   error: null,
    //   schema: {
    //     type: "object",
    //     title: "Untitled form",
    //     description: "Enter some description for your form here",
    //     properties: {}
    //   },
    //   uiSchema: {
    //     "ui:order": []
    //   },
    //   formData: {},
    //   currentIndex: 0,
    // };
    const INITIAL_STATE = this.props.data;

    return(
      <Form
        id={this.props.id}
        error={INITIAL_STATE.error}
        dragndropStatus={false}
        schema={INITIAL_STATE.schema}
        uiSchema={INITIAL_STATE.uiSchema}
        currentIndex={INITIAL_STATE.currentIndex}
        SchemaField={EditableField}  
        TitleField={TitleField}
        DescriptionField={DescriptionField}
        onChange={this.onChange} />
    );
  }
}

export default Builder