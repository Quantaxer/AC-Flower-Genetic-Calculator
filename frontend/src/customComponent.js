import { Component } from "react";

class CustomComponent extends Component {
  setStateAsync(state) {
    try {
      return new Promise((resolve) => {
        this.setState(state, resolve);
      });
    } catch (e) {
      console.log(e);
    }
  }

  postAPI = async (endpoint, postBody) => {
    try {
      let response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      });
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (e) {
      console.log(e);
    }
  };

  //This is responsible for converting the genes of the flower in a map representation into a string the database will recognize
  //Basically just turning a map int oa string with hyphens.
  hyphenateGeneString = (flowerGeneMap) => {
    let strCount = 0;
    let result = "";
    for (let geneSequence of Object.entries(flowerGeneMap)) {
      result = result + geneSequence[1];
      if (strCount < Object.entries(flowerGeneMap).length - 1) {
        result = result + "-";
      }
      strCount++;
    }
    return result;
  };
}

export default CustomComponent;
