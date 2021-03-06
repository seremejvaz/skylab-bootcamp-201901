'use sctric';

const httpStatus = require('http-status');
const { Quiz } = require('triviapp-data');
const quiz = require('../logic/quiz');
const { handleResponseError } = require('../routes/routes-helper');
const { UnauthorizedError } = require('../errors');
const { cloudName, apiKey, apiSecret } = require('../../config/vars');

/**
 * Load quiz
 */
exports.load = async (req, res, next, id) => {
	try {
		const quiz = await Quiz.get(id);
		req.locals = { quiz };
		return next();
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Get quiz
 */
exports.get = (req, res) => res.json(req.locals.quiz.normalize());

/**
 * List quizzes
 */
exports.list = async (req, res) => {
	const {
		params: { offset = 0 },
	} = req;

	try {
		req.body.page = offset;
		const quizzes = await quiz.listQuizzes(req.body);
		return res.json(quizzes);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * List quiz by author
 */
exports.listByAuthor = async (req, res) => {
	const {
		params: { offset = 0 },
	} = req;
	try {
		req.body.page = offset;
		req.body.authorID = req.userId;
		const quizzes = await quiz.listQuizzesByAuthor(req.body);
		return res.json(quizzes);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Search quiz
 */
exports.search = async (req, res) => {
	const {
		params: { offset = 0 },
	} = req;

	try {
		req.body.page = offset;
		const quizzes = await quiz.searchQuizzesByQuery(req.body);
		return res.json(quizzes);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Create quiz
 */
exports.create = async (req, res) => {
	try {
		req.body.author = req.userId;
		const quizAdd = await quiz.createQuiz(req.body);
		res.status(httpStatus.CREATED);
		return res.json(quizAdd);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Update quiz
 */
exports.update = async (req, res) => {
	try {
		const quizUpdated = await quiz.updateQuiz(req.locals.quiz, req.body);
		res.status(httpStatus.OK);
		return res.json(quizUpdated);
	} catch (error) {
		handleResponseError(error, res);
	}
};

/**
 * Remove quiz
 */
exports.remove = async (req, res, next) => {
	try {
		const { quiz: quizToDelete } = req.locals;
		await quiz.deleteQuiz(quizToDelete);
		res.status(httpStatus.OK).json('Quiz deleted');
	} catch (error) {
		handleResponseError(error, res);
	}
  };
