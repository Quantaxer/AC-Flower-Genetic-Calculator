let trinaryToAllele = function (flowerGenes) {
  let alleleFlower = "";
  let geneList = flowerGenes.split("-");
  for (let x = 0; x < geneList.length; x++) {
    let newAllele = "";
    switch (geneList[x]) {
      case "0":
        newAllele = "xx";
        break;
      case "1":
        newAllele = "Xx";
        break;
      case "2":
        newAllele = "XX";
        break;
    }
    alleleFlower = alleleFlower + newAllele;
    if (x < geneList.length - 1) {
      alleleFlower = alleleFlower + "-";
    }
  }

  return alleleFlower;
};

let alleleToTrinary = function (flowerGenes) {
  let trinaryFlower = "";

  let geneList = flowerGenes.split("-");
  for (let x = 0; x < geneList.length; x++) {
    let newAllele = "";
    let gene = geneList[x];

    if (gene.match("^[A-Z]*$")) {
      newAllele = "2";
    } else if (gene.match("^[a-z]*$")) {
      newAllele = "0";
    } else {
      newAllele = "1";
    }

    trinaryFlower = trinaryFlower + newAllele;
    if (x < geneList.length - 1) {
      trinaryFlower = trinaryFlower + "-";
    }
  }

  return trinaryFlower;
};

exports.trinaryToAllele = trinaryToAllele;
exports.alleleToTrinary = alleleToTrinary;
