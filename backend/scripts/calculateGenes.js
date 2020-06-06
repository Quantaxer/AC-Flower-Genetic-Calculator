function calculateRow(flower) {
  let numberOfAlleles = flower.length;
  let row = [];

  //Total number of rows must be 2 ^ number of alleles in the flower
  for (let x = 0; x < 2 ** numberOfAlleles; x++) {
    let rowCell = [];

    //Swap between all possible combinations of alleles for a particular flower
    for (let y = 0; y < numberOfAlleles; y++) {
      let gene = flower[y];
      rowCell.push(
        Math.pow(2, numberOfAlleles - y - 1) & x ? gene[1] : gene[0]
      );
    }
    rowCell = rowCell.toString().replace(/,/g, "");
    row.push(rowCell);
  }
  return row;
}

let breedFlowers = function(parentFlower1, parentFlower2) {
  let childFlowerMatrix = [];

  //Format and calculate the rows for the punnettt square
  parentFlower1 = parentFlower1.split("-");
  parentFlower2 = parentFlower2.split("-");
  let row1 = calculateRow(parentFlower1);
  let row2 = calculateRow(parentFlower2);

  //Calculate cells in the punnett square
  for (let x of row1) {
    for (let y of row2) {
      let newGenome = "";
      for (let z = 0; z < y.length; z++) {
        //Sorts the alleles in the correct order
        newGenome = newGenome + (x[z] + y[z]).split("").sort().join("");
        //Readd the dash for visibility
        if (z < y.length - 1) {
          newGenome = newGenome + "-";
        }
      }
      childFlowerMatrix.push(newGenome);
    }
  }
  return childFlowerMatrix;
}

let calculateFrequencyOfOffspring = function(listOfOffspring) {
  let offspringMap = {};

  //Count number of unique offspring
  for (let flower of listOfOffspring) {
    if (offspringMap[flower] === undefined) {
      offspringMap[flower] = 1;
    } else {
      offspringMap[flower] += 1;
    }
  }

  //Calculate frequency for every unique offspring
  sum = Object.values(offspringMap).reduce((t, n) => t + n);
  for (let flower in offspringMap) {
    offspringMap[flower] = (offspringMap[flower] / sum) * 100;
  }

  return offspringMap;
}

exports.breedFlowers = breedFlowers;
exports.calculateFrequencyOfOffspring = calculateFrequencyOfOffspring;