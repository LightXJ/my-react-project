require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';



class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice">Please edit <code>src/components/Main.jsx</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
