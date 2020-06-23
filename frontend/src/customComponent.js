import React, { Component } from 'react';


class CustomComponent extends Component {
    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }
}

export default CustomComponent;
