import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import gameService from '../../../services/game';
import authService from '../../../services/auth';
import feedback from '../../../utils/feedback';

function Pin(props) {
	const [code, setCode] = useState(null);

	const joinGame = async Event => {
		Event.preventDefault();
		try {
			const { game } = await gameService.joinGame(code);
			props.history.push(`/player/${game.id}/youarein`);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	return (
		<div className="player-game">
			<section className="login">
				<div className="login__wrapper">
					<form onSubmit={joinGame}>
						<div className="login__container">
							<fieldset className="login__fieldset">
								<p className="login__p">
									<label className="login__label" htmlFor="game-pin">
										Game PIN
									</label>
									<input
										className="login__input"
										placeholder="Game PIN"
										autoFocus="autofocus"
										autoComplete="off"
										type="number"
										name="gamepin"
										id="game-pin"
										disabled={!authService.isUserLoggedIn}
										onChange={Event => setCode(Number(Event.target.value))}
									/>
								</p>
								<button
									className="btn__link btn__link--green login__submit"
									disabled={!authService.isUserLoggedIn}
								>
									Enter
								</button>
							</fieldset>
						</div>
					</form>
					<footer className="login__footer">
						Have an account?{' '}
						<Link to="/login" title="Log in" className="login__signup">
							Log in!
						</Link>
					</footer>
				</div>
			</section>
		</div>
	);
}

export default withRouter(Pin);
