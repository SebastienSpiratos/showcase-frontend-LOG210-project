import React, { Component } from 'react';

export default class FormateurRole extends Component {
  constructor(props){
    super(props)

    this.state = {
    };
  }

  render() {
    if (this.props.langue === "fr") {
      return (
        <span>{this.props.role.fr}</span>
      );
    }
    if (this.props.langue === "en") {
      return (
        <span>{this.props.role.en}</span>
      );
    }
    return null;
  }
}
