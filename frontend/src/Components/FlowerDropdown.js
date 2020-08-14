import React from "react";
import CustomDropdown from "../assets/jss/CustomDropdown";
import "../Styling/FlowerDropdown.css";
import CustomComponent from "../customComponent.js";

class FlowerDropdown extends CustomComponent {
  constructor(props) {
    super(props);

    this.state = {
      species: "Tulip",
    };
  }

  //Hanlder for clicking on the dropdown
  handleChange = async (event) => {
    //Note that roses have a more genes than the other flowers. Assume 3 genes otherwise.
    let numOfGenes = 3;

    await this.setStateAsync({ species: event});
    if (this.state.species === "Rose") {
      numOfGenes = 4;
    }
    this.props.getDropdown(this.state.species, numOfGenes);
  };

  render() {
    return (
      <div className="FlowerDropdown">
        <CustomDropdown
          buttonText={this.state.species}
          hoverColor="rose"
          buttonProps={{
            round: true,
            onChange: this.handleChange,
            color: "rose",
          }}
          onClick={(menuItem) => this.handleChange(menuItem)}
          dropdownList={[
            "Tulip",
            "Rose",
            "Cosmo",
            "Lily",
            "Pansy",
            "Hyacinth",
            "Mum",
            "Windflower",
          ]}
        />
      </div>
    );
  }
}

export default FlowerDropdown;
