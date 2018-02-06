import React, { Component } from "react";
import Form from "react-jsonschema-form";
import config from "./Builder/config";

export default class Survey extends Component {
    componentDidMount() {
        // If the schema properties is empty, then try to load the schema from the
        // if (Object.keys(this.props.schema.properties).length === 0) {
        //     this.props.loadSchema(this.props.params.id, (data) => {
        //         document.title = data.schema.title;
        //     });
        // }
    }

    render() {
        const origin = "/";
        const onSubmit = ({formData}) => {
        // this.props.submitRecord(formData, this.props.params.id, () => {
        //     this.props.history.pushState(null, "/form/data-sent");
        // });
        };
        return (
            <div className="narrow">
                <Form schema={this.props.data.schema} uiSchema={this.props.data.uiSchema} onSubmit={onSubmit}/>
                <p className="small">This form was created with <a href={origin}>{config.projectName}</a>.</p>
            </div>
    );
  }
}