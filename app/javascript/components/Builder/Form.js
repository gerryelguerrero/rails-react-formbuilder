import React from "react";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import FormActions from "./FormActions";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  addField() {
    
  }

  updateFormTitle(data) {
    this.setState(prevState => ({
      schema: {
        ...prevState.schema,
        title: data.title
      }
    }));
  }

  updateFormDescription(data) {
    this.setState(prevState => ({
      schema: {
        ...prevState.schema,
        description: data.description
      }
    }));
  }

  render() {
    const {error, dragndropStatus} = this.state;
    console.log("dragndropstatus", dragndropStatus);

    const registry = {
      ...SchemaField.defaultProps.registry,
      fields: {
        ...SchemaField.defaultProps.registry.fields,
        SchemaField: this.state.SchemaField,
        TitleField: this.state.TitleField,
        DescriptionField: this.state.DescriptionField,
      },
      formContext: {
        updateFormTitle: this.updateFormTitle.bind(this),
        updateFormDescription: this.updateFormDescription.bind(this),
        addField: this.addField.bind(this),
      }
    };

    return (
      <div>
        {error ? <div className="alert alert-danger">{error}</div> : <div/>}
        <div className="rjsf builder-form">
          <SchemaField {...this.state} registry={registry} />
        </div>

        <FormActions {...this.state} />
      </div>
    );
  }
}

export default Form


// export default function Form(props) {
//   const {error, dragndropStatus} = props;
//   console.log("dragndropstatus", dragndropStatus);

//   const registry = {
//     ...SchemaField.defaultProps.registry,
//     fields: {
//       ...SchemaField.defaultProps.registry.fields,
//       SchemaField: props.SchemaField,
//       TitleField: props.TitleField,
//       DescriptionField: props.DescriptionField,
//     }
//   };

//   return (
//     <div>
//       {error ? <div className="alert alert-danger">{error}</div> : <div/>}
//       <div className="rjsf builder-form">
//         <SchemaField {...props} registry={registry} />
//       </div>

//       <FormActions {...props} />
//     </div>
//   );
// }