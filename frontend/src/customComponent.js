import { Component } from "react";

class CustomComponent extends Component {
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  postAPI = async (endpoint, postBody) => {
    let response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    });
    const body = await response.json();

    if (response.status !== 200 || response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
}

export default CustomComponent;
