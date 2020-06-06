let express = require("express");
const geneModule = require("../scripts/calculateGenes");

let router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.send({ msg: "this is the API home page" });
});

router.post("/calculateChild", async function (req, res, next) {
  try {
    let flower1 = req.body.flower1;
    let flower2 = req.body.flower2;

    let results = geneModule.breedFlowers(flower1, flower2);
    let frequencyResults = geneModule.calculateFrequencyOfOffspring(results);

    res.send({ msg: frequencyResults });
  } catch (error) {
    res.status(500);
    res.send({ err: error });
  }
});

module.exports = router;
