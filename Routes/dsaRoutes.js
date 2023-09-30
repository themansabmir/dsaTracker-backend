const {
  createQuestion,
  getQuestions,
  getQuestionById,
} = require("../Controllers/dsaController");

const router = require("express").Router();

router.route("/questions").post(createQuestion).get(getQuestions);
router.route("/questionById").post(getQuestionById);
module.exports = router;
