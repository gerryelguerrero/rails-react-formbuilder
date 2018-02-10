import React from "react";
import S from "string";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import FormActions from "./FormActions";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      addField: this.addField.bind(this),
    };
  }

  slugify(string) {
    return S(string).slugify().replace("-", "_").s;
  }

  addField(field) {
    let stateT = {...this.state}
    stateT.currentIndex += 1;
    const name = `Question ${stateT.currentIndex}`;
    const _slug = this.slugify(name);

    if (stateT.schema.properties === "") {
      stateT.schema.properties = {};
    }
    stateT.schema.properties[_slug] = {...field.jsonSchema, title: name};
    
    if (stateT.uiSchema["ui:order"] === "") {
      stateT.uiSchema["ui:order"] = [];
    }
    stateT.uiSchema[_slug] = field.uiSchema;
    stateT.uiSchema["ui:order"] = (stateT.uiSchema["ui:order"] || []).concat(_slug);

    this.setState({stateT})
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