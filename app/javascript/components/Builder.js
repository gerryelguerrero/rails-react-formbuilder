import React from "react"
import PropTypes from "prop-types"
import TitleField from "./Builder/TitleField";
import DescriptionField from "./Builder/DescriptionField";
class Builder extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div className="builderContainer">
        <TitleField title={this.props.title} /> <br/>
        <DescriptionField description={this.props.description} />
      </div>
    );
  }
}

Builder.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default Builder
