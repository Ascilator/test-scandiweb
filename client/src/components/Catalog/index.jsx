import React, { Component } from "react";

class Catalog extends Component {
  render() {
    const { catalog } = this.props;
    return <div>{JSON.stringify(catalog)}</div>;
  }
}

export default Catalog;
