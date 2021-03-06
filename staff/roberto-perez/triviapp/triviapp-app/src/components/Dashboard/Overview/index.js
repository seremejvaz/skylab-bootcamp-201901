import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import feedback from '../../../utils/feedback';

import quiz from '../../../services/quiz';
import questionService from '../../../services/question';
import requiereAuth from '../../middlewares/requireAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Overview(props) {
	const [currentQuiz, setCurrentQuiz] = useState('');
	const [questions, setQuestions] = useState([]);

	const {
		match: {
			params: { quizId },
		},
	} = props;

	useEffect(() => {
		getQuizById(quizId);
	}, [props.match.params.quizId]);

	const getQuizById = async quizId => {
		try {
			const newQuiz = await quiz.get(quizId);
			setCurrentQuiz(newQuiz);
			setQuestions(newQuiz.questions);
		} catch (error) {
			feedback(error.message, 'error');
			props.history.push(`/dashboard`);
		}
	};

	const deleteQuizzById = async quizId => {
		try {
			await quiz.delete(quizId);

			feedback('Quiz deleted Successfully!', 'success')

			props.history.push(`/dashboard`);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	const deleteQuestionById = async questionId => {
		try {
			await questionService.delete(quizId, questionId);

			feedback('Question deleted Successfully!', 'success')

			const questionsArr = questions.filter(_question => {
				return _question._id !== questionId;
			});

			questionsArr.length <= 0 ? setQuestions([]) : setQuestions(questionsArr);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	const handleDeleteQuizz = questionId => {
		deleteQuizzById(questionId);
	};

	const handleDeleteQuestion = questionId => {
		deleteQuestionById(questionId);
	};

	return (
		<Fragment>
			<section>
				<header className="header-section">
					<h1 className="login__title">Description</h1>
				</header>
				<section className="content-quiz">
					<figure className="content-quiz__figure">
						<img
							className="content-quiz__image"
							src={currentQuiz.picture}
							alt=""
						/>
					</figure>
					<div className="content-quiz__info">
						<div className="content-quiz__info-text">
							<h1 className="content-quiz__title">{currentQuiz.title}</h1>
							<p className="content-quiz__description">
								{currentQuiz.description}
							</p>
						</div>
						<aside className="content-quiz__actions">
							<Link
								to={`/dashboard/edit/${quizId}/description`}
								title="Editar"
								className="content-quiz__edit-btn"
							>
								<FontAwesomeIcon icon="pen" /> Edit
							</Link>
							<button
								onClick={() => handleDeleteQuizz(quizId)}
								className="content-quiz__delete-btn"
							>
								<FontAwesomeIcon icon="trash-alt" /> Delete
							</button>
						</aside>
					</div>
				</section>
			</section>

			<header className="header-section">
				<h2 className="login__title">Game creator</h2>
			</header>

			{questions.map((question, index) => {
				return (
					<section className="content-quiz content-question" key={question._id}>
						<figure className="content-question__figure">
							{question.picture ? (
								<img
									className="content-quiz__image"
									src={question.picture}
									alt=""
								/>
							) : (
								<span className="content-question__figure-info">
									{index + 1}
								</span>
							)}
						</figure>
						<div className="content-question__info">
							<h4 className="content-question__title">
								Q{index + 1}: {question.title}
							</h4>

							<aside className="content-question__actions">
								<Link
									to={`/dashboard/edit/${quizId}/question/${
										question._id
									}`}
									title="Editar"
									className="content-quiz__edit-btn"
								>
									<FontAwesomeIcon icon="pen" /> Edit
								</Link>
								<button
									onClick={() => handleDeleteQuestion(question._id)}
									className="content-quiz__delete-btn"
								>
									<FontAwesomeIcon icon="trash-alt" /> Delete
								</button>
							</aside>
						</div>
					</section>
				);
			})}

			<div className="content-add-question">
				<Link
					to={`/dashboard/edit/${quizId}/question/`}
					title="Crear"
					className="content-add-question__link"
				>
					<span className="content-add-question__icon-wrap">
						<FontAwesomeIcon icon="plus" />
					</span>
					<span className="content-actions__text">Add question</span>
				</Link>
			</div>
		</Fragment>
	);
}

export default requiereAuth(Overview);
