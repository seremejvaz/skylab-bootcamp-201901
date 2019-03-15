'use sctric';

const httpStatus = require('http-status');
const { Question, Quiz } = require('triviapp-data');
const question = require('../logic/question');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
	// const {
	// 	params: { quizId },
	// } = req;

	try {
		// const quiz = await  Quiz.get(quizId);
		const question = await Question.get(id)
		req.locals = { question };
		return next();
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get quiz
 * @public
 */
exports.get = (req, res) => {
	const {
		params: { quizId },
	} = req;
	res.json(req.locals.question.normalize())
};

exports.create = async (req, res, next) => {
	const {
		params: { quizId },
	} = req;
	
	try {
		req.body.quiz = quizId;
		const questionAdd = await question.createQuestion(req.body);
		res.status(httpStatus.CREATED);
		return res.json(questionAdd);
	} catch (error) {
		handleResponseError(error, res);
	}
};

exports.update = async (req, res) => {
	// const {
	// 	params: { quizId },
	// } = req;

	try {
		const questionUpdated = await question.updateQuestion(req.locals.question, req.body);
		res.status(httpStatus.OK);
		return res.json(questionUpdated);
	} catch (error) {
		handleResponseError(error, res);
	}
};


exports.remove = async (req, res, next) => {
	try {
		await question.deleteQuestion(req.locals.question);
		res.status(httpStatus.OK).json('Question deleted');
	} catch (error) {
		handleResponseError(error, res);
	}
  };
