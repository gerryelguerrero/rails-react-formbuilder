import React from "react"
import PropTypes from "prop-types"
export default class HelloWorld extends React.Component {
  render () {
    return (
      <div>
        <div>Greeting: {this.props.greeting}</div>
      </div>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
