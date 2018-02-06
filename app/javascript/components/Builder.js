import React from "react";
import PropTypes from "prop-types";

import Form from "./Builder/Form";

import TitleField from "./Builder/TitleField";
import DescriptionField from "./Builder/DescriptionField";
import EditableField from "./Builder/EditableField";

class Builder extends React.Component {
  constructor(props) {
    super(props);
  }

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
        schema={INITIAL_STATE.schema}
        uiSchema={INITIAL_STATE.uiSchema}
        currentIndex={INITIAL_STATE.currentIndex}
        formData={INITIAL_STATE.formData}>
        <EditableField />        
        <TitleField />
        <DescriptionField />
      </Form>
    );
  }
}

export default Builder