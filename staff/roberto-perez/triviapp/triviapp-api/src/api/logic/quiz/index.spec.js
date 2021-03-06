'use strict';

require('dotenv').config();
const httpStatus = require('http-status');
const expect = require('expect');
const { Quiz, User } = require('triviapp-data');
const mongoose = require('../../../config/mongoose');
const { MongooseError } = mongoose;
const quiz = require('.');
const logicQuestion = require('../question');
const {
	AlreadyExistsError,
	UnauthorizedError,
	NotFoundError,
} = require('triviapp-errors');

describe('Quiz', () => {
	before(() => mongoose.connect('mongodb://localhost:27017/quiz-test'));

	beforeEach(() => Promise.all([User.deleteMany(), Quiz.deleteMany()]));

	describe('POST /v1/quiz', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			dataQuiz = {
				author: author.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};
		});

		it('should succeed on valid data', async () => {
			const { id } = await quiz.createQuiz(dataQuiz);

			let quizAdded = await Quiz.get(id);

			expect(id).toBeDefined();
			expect(typeof id).toBe('string');
			expect(quizAdded.author.id.toString()).toBe(dataQuiz.author);
			expect(quizAdded.title).toBe(dataQuiz.title);
			expect(quizAdded.description).toBe(dataQuiz.description);
			expect(quizAdded.picture).toBe(dataQuiz.picture);
		});

		it('should fail when title is not a string', () => {
			dataQuiz.title = undefined;
			expect(() => {
				quiz.createQuiz(dataQuiz);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should fail when description is not a string', () => {
			dataQuiz.description = undefined;
			expect(() => {
				quiz.createQuiz(dataQuiz);
			}).toThrow(TypeError(undefined + ' is not a string'));
		});

		it('should report error when author ID is not provided', async () => {
			try {
				delete dataQuiz.author;
				await quiz.createQuiz(dataQuiz);
			} catch (err) {
				expect(err.name).toBe('ValidationError');
				expect(err.message).toEqual(
					`Quiz validation failed: author: Path \`author\` is required.`,
				);
			}
		});

		it('should report error when author is not the owner', async () => {
			try {
				dataUser = {
					name: `n-${Math.random()}`,
					surname: `s-${Math.random()}`,
					email: `john-doe2${Math.random()}@gmail.com`,
					password: `p-${Math.random()}`,
				};

				const user = new User(dataUser);
				const savedUser = await user.save();
				author = savedUser.normalize();

				dataQuiz.author = 'qweqweqweqwe';

				await quiz.createQuiz(dataQuiz);
			} catch (err) {
				expect(err.name).toBe('ValidationError');
				expect(err.message).toEqual(
					`Quiz validation failed: author: Path \`author\` is required.`,
				);
			}
		});
	});

	describe('PATCH /v1/quiz/:id', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let quizAdded;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			dataQuiz = {
				author: author.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};

			quizAdded = await quiz.createQuiz(dataQuiz);
		});

		it('should succeed on valid data', async () => {
			let data = {
				title: 'Enquesta numero 2',
				description: 'Lorem ipsum dolor is amet....',
			};

			const currentQUiz = await Quiz.get(quizAdded.id);
			const quizUpdated = await quiz.updateQuiz(currentQUiz, data);
			expect(quizUpdated.title).toBe(data.title);
			expect(quizUpdated.description).toBe(data.description);
		});

		it('should return the same Quiz if we pass a empty object', async () => {
			let data = {};

			const currentQUiz = await Quiz.get(quizAdded.id);
			const quizUpdated = await quiz.updateQuiz(currentQUiz, data);
			expect(quizUpdated.title).toBe(dataQuiz.title);
			expect(quizUpdated.description).toBe(dataQuiz.description);
		});
	});

	describe('DELETE /v1/quiz/:id', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;
		let quizAdded;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			dataQuiz = {
				author: author.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};

			quizAdded = await quiz.createQuiz(dataQuiz);
		});

		it('should succeed on valid data', async () => {
			try {
				const currentQUiz = await Quiz.get(quizAdded.id);
				await quiz.deleteQuiz(currentQUiz);
				const deletedQuiz = await Quiz.get(quizAdded.id);
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundError);
				expect(err.message).toEqual(`Quiz does not exist`);
			}
		});

		it('should not delete Quiz with bad ID', async () => {
			try {
				const currentQUiz = await Quiz.get('123');
			} catch (err) {
				expect(err.message).toEqual(
					`Cast to ObjectId failed for value "123" at path "_id" for model "Quiz"`,
				);
			}
		});
	});

	describe('GET /v1/quiz/page/:offset', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

				const { id } = await quiz.createQuiz(dataQuiz);

				let dataQuestion = {
					quiz: id.toString(),
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await logicQuestion.createQuestion(dataQuestion);
			}
		});

		it('should be list 6 quizzes when the arguments are empties', async () => {
			const listOfQuizz = await quiz.listQuizzes();

			expect(listOfQuizz.length).toEqual(6);
		});

		it('should be list 2 quizzes when perPage arguments is 2', async () => {
			const listOfQuizz = await quiz.listQuizzes({ page: 1, perPage: 2 });

			expect(listOfQuizz.length).toEqual(2);
		});
	});

	describe('GET /v1/quiz/page/:offset/author', () => {
		let dataUser = {};
		let dataUserNoAuthor = {};
		let dataQuiz = {};
		let dataQuizNoAuthor = {};
		let author;
		let noAuthor;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

				await quiz.createQuiz(dataQuiz);
			}

			dataUserNoAuthor = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `bob-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const userNoAuthor = new User(dataUserNoAuthor);
			const savedUserNoAuthor = await userNoAuthor.save();
			noAuthor = savedUserNoAuthor.normalize();

			dataQuizNoAuthor = {
				author: noAuthor.id,
				title: `Quiz title-${Math.random()}`,
				description: `Quiz description-${Math.random()}`,
				picture: `Quiz image-${Math.random()}`,
				questions: [],
			};

			await quiz.createQuiz(dataQuizNoAuthor);
		});

		it('should be list 6 quizzes when the arguments are empties', async () => {
			const listOfQuizz = await quiz.listQuizzesByAuthor({ authorID: author.id });

			expect(listOfQuizz.length).toEqual(6);
		});

		it('should be list 2 quizzes when perPage arguments is 2', async () => {
			const listOfQuizz = await quiz.listQuizzesByAuthor({
				page: 1,
				perPage: 2,
				authorID: author.id,
			});

			expect(listOfQuizz.length).toEqual(2);
		});

		it('should be list 0 quizzes when author is empty', async () => {
			try {
				const listOfQuizz = await quiz.listQuizzesByAuthor({
					page: 1,
					perPage: 2,
				});
			} catch (err) {
				expect(err.message).toEqual(
					`Access is denied due to invalid credentials.`,
				);
			}
		});
	});

	describe('POST /v1/quiz/page/:offset', () => {
		let dataUser = {};
		let dataQuiz = {};
		let author;

		beforeEach(async () => {
			dataUser = {
				name: `n-${Math.random()}`,
				surname: `s-${Math.random()}`,
				email: `john-doe${Math.random()}@gmail.com`,
				password: `p-${Math.random()}`,
			};

			const user = new User(dataUser);
			const savedUser = await user.save();
			author = savedUser.normalize();

			for (let i = 0; i < 6; i++) {
				dataQuiz = {
					author: author.id,
					title: `Quiz title-${Math.random()}`,
					description: `Quiz description-${Math.random()}`,
					picture: `Quiz image-${Math.random()}`,
					questions: [],
				};

				const { id } = await quiz.createQuiz(dataQuiz);

				let dataQuestion = {
					quiz: id.toString(),
					title: `Question - ${Math.random()}`,
					time: '15',
					answers: [
						{ title: 'Answer 1', success: true },
						{ title: 'Answer 2', success: false },
						{ title: '', success: false },
						{ title: '', success: false },
					],
				};

				await logicQuestion.createQuestion(dataQuestion);
			}
		});

		it('should be list 6 quizzes when the arguments are empties', async () => {
			const query = {
				query: 'Quiz'
			}
			const listOfQuizz = await quiz.searchQuizzesByQuery(query);

			expect(listOfQuizz.length).toEqual(6);
		});

		it('should be list 2 quizzes when perPage arguments is 2', async () => {
			const listOfQuizz = await quiz.searchQuizzesByQuery({ page: 1, perPage: 2, query: 'Quiz' });

			expect(listOfQuizz.length).toEqual(2);
		});
	});

	after(() =>
		Promise.all([User.deleteMany(), Quiz.deleteMany()]).then(() =>
			mongoose.disconnect(),
		),
	);
});
