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
      switchField: this.switchField.bind(this),
      removeField: this.removeField.bind(this),
      updateField: this.updateField.bind(this),
      renameField: this.renameField.bind(this),
      insertField: this.insertField.bind(this),
      swapFields: this.swapFields.bind(this),
    };
  }

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  unique(array) {
    return Array.from(new Set(array));
  }

  slugify(string) {
    return S(string).slugify().replace("-", "_").s;
  }

  addField(field, flag) {
    let stateT = {...this.state};
    flag = flag || false;

    let newIndex = parseInt(stateT.currentIndex) + 1;
    stateT.currentIndex = newIndex.toString();

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

    if (flag) {
      return stateT;
    }

    this.setState({...stateT});
  }

  switchField(propertyName, newField) {
    let stateT = {...this.state};
    
    stateT.schema.properties[propertyName] = {...newField.jsonSchema};
    stateT.uiSchema[propertyName] = newField.uiSchema;
  
    this.setState({stateT});
  }
  
  removeField(name) {
    let stateT = {...this.state};

    const requiredFields = stateT.schema.required || [];
    delete stateT.schema.properties[name];
    delete stateT.uiSchema[name];
    stateT.uiSchema["ui:order"] = stateT.uiSchema["ui:order"].filter(
      (field) => field !== name);
    stateT.schema.required = requiredFields
      .filter(requiredFieldName => name !== requiredFieldName);
    if (stateT.schema.required.length === 0) {
      delete stateT.schema.required;
    }
    
    this.setState({...stateT, error: null});
  }
  
  updateField(name, schema, required, newLabel) {
    let stateT = {...this.state};

    const existing = Object.keys(stateT.schema.properties);
    const newName = this.slugify(newLabel);
    if (name !== newName && existing.indexOf(newName) !== -1) {
      // Field name already exists, we can't update state
      const error = `Duplicate field name "${newName}", operation aborted.`;
      this.setState({...stateT, error});
    }
    const requiredFields = stateT.schema.required || [];
    stateT.schema.properties[name] = schema;
    if (required) {
      // Ensure uniquely required field names
      stateT.schema.required = this.unique(requiredFields.concat(name));
    } else {
      stateT.schema.required = requiredFields
        .filter(requiredFieldName => name !== requiredFieldName);
    }
    if (newName !== name) {
      let rename = this.renameField(name, newName);
      this.setState({rename});
    }
    this.setState({...stateT, error: null});
  }
  
  renameField(name, newName) {
    let stateT = {...this.state};

    const schema = this.clone(stateT.schema.properties[name]);
    const uiSchema = this.clone(stateT.uiSchema[name]);
    const order = stateT.uiSchema["ui:order"];
    const required = stateT.schema.required;
    delete stateT.schema.properties[name];
    delete stateT.uiSchema[name];
    stateT.schema.properties[newName] = schema;
    stateT.schema.required = required.map(fieldName => {
      return fieldName === name ? newName : fieldName;
    });
    stateT.uiSchema[newName] = uiSchema;
    stateT.uiSchema["ui:order"] = order.map(fieldName => {
      return fieldName === name ? newName : fieldName;
    });
    
    this.setState({...stateT, error: null});
  }
  
  insertField(field, before) {
    let flag = true;

    const insertedState = this.addField(field, flag);
    const order = insertedState.uiSchema["ui:order"];
    const added = order[order.length - 1];
    const idxBefore = order.indexOf(before);
    const newOrder = [].concat(
      order.slice(0, idxBefore),
      added,
      order.slice(idxBefore, order.length - 1)
    );
    insertedState.uiSchema["ui:order"] = newOrder;
    this.setState({...insertedState, error: null});
  }
  
  swapFields(source, target) {
    const order = stateT.uiSchema["ui:order"];
    const idxSource = order.indexOf(source);
    const idxTarget = order.indexOf(target);
    order[idxSource] = target;
    order[idxTarget] = source;
    this.setState({...state, error: null});
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
        switchField: this.switchField.bind(this),
        removeField: this.removeField.bind(this),
        updateField: this.updateField.bind(this),
        renameField: this.renameField.bind(this),
        insertField: this.insertField.bind(this),
        swapFields: this.swapFields.bind(this),
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