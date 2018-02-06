import React from "react";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import FormActions from "./FormActions";

export default function Form(props) {
  const {error, dragndropStatus} = props;
  console.log("dragndropstatus", dragndropStatus);

  const onChange = () => {}

  const registry = {
    ...SchemaField.defaultProps.registry,
    fields: {
      ...SchemaField.defaultProps.registry.fields,
      SchemaField: props.children[0].type,
      TitleField: props.children[1].type,
      DescriptionField: props.children[2].type,
    }
  };

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : <div/>}
      <div className="rjsf builder-form">
        <SchemaField {...props} registry={registry} onChange={onChange} />
      </div>

      <FormActions {...props} />
    </div>
  );
}