import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GoBack extends Component {
  render() {
    return (
      <div className="main_wrapper go_back">
        <Link className="go_back" to={`/catalog`}>
          ← Catalog
        </Link>
      </div>
    );
  }
}

export default GoBack;
