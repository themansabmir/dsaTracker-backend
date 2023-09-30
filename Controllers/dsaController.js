const Question = require("../model/dsaModel");

const createQuestion = async (req, res) => {
  try {
      const data = req.body;
      console.log(data)

    const doesExist = await Question.findOne({ questionUrl: data.questionUrl });
    if (doesExist) return res.status(500).json({ msg: "Data already exists" });

    const newQuestion =await Question.create(data);
    return res.status(200).json({ data: newQuestion });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json({ data: questions });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.body;
    const question =await Question.findById({ _id: questionId });
    return res.status(200).json({ msg: question });
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
};

module.exports = { getQuestions, createQuestion, getQuestionById };
