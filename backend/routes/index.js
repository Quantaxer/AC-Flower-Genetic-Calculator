let express = require("express");
const geneModule = require("../scripts/calculateGenes");
const convertGenes = require("../scripts/convertGenes");

let router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.send({ msg: "this is the API home page" });
});

router.post("/calculateChild", async function (req, res, next) {
  try {
    let flower1 = convertGenes.trinaryToAllele(req.body.flower1);
    let flower2 = convertGenes.trinaryToAllele(req.body.flower2);

    let results = geneModule.breedFlowers(flower1, flower2);
    let frequencyResults = geneModule.calculateFrequencyOfOffspring(results);

    let convertedResults = {};

    for (let offspring in frequencyResults) {
      convertedResults[convertGenes.alleleToTrinary(offspring)] = frequencyResults[offspring];
    }

    res.send({ msg: convertedResults });
  } catch (error) {
    res.status(500);
    res.send({ err: error });
  }
});

module.exports = router;
