import React, { Component } from "react";
import "./Styling/App.css";
import Container from "./Components/Container";
import BreedFlowers from "./Components/BreedFlowers";
import SearchDatabase from "./Components/SearchDatabase";

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.msg }))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/db/connectToDB");
    const body = await response.json();

    if (response.status !== 200 || response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <Container>
          <SearchDatabase />
        </Container>

        <Container>
          <BreedFlowers />
        </Container>
      </div>
    );
  }
}

export default App;
