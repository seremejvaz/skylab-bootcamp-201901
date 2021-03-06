import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';

import feedback from '../../utils/feedback';

import requireAuth from '../middlewares/requireAuth';

import auth from '../../services/auth';
import imageService from '../../services/image';

function UserProfile(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [uploading, setUploading] = useState(false);
	const [image, setImage] = useState(null);

	const onDrop = useCallback(async acceptedFiles => {
		try {
			setUploading(true);
			const imageUploaded = await imageService.upload(acceptedFiles[0]);
			setImage(imageUploaded.secure_url);
			setUploading(false);
		} catch (error) {
			feedback(error.message, 'error');
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleUpdateUser = async Event => {
		Event.preventDefault();

		try {
			const user = await auth.updateUser({
				name,
				surname,
				email,
				image,
				password,
				confirmPassword,
			});

			feedback('Profile edited Successfully!', 'success');

			props.history.push(`/dashboard`);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	useEffect(() => {
		retrieveUser();
	}, []);

	const retrieveUser = async () => {
		try {
			const user = await auth.retrieveUser();

			setName(user.name);

			setSurname(user.surname);

			setEmail(user.email);

			setImage(user.picture);
		} catch (error) {
			feedback(error.message, 'error');
		}
	};

	return (
		<div className="container">
			<section className="create-quiz-wrap">
				<div className="form__wrapper">
					<form onSubmit={handleUpdateUser}>
						<div className="form__container">
							<header className="form__header">
								<h2 className="form__title">Edit profile</h2>
							</header>

							<div className="create-quiz">
								<div className="create-quiz__wrap">
									<fieldset className="form__fieldset">
										<p className="form__p">
											<label
												className="form__label"
												htmlFor="user_name"
											>
												Name
											</label>
											<input
												className="form__input"
												autoFocus="autofocus"
												placeholder="Name"
												type="text"
												name="name"
												id="user_name"
												defaultValue={name}
												onChange={Event =>
													setName(Event.target.value)
												}
											/>
										</p>
										<p className="form__p">
											<label
												className="form__label"
												htmlFor="user_surname"
											>
												Surname
											</label>
											<input
												className="form__input"
												placeholder="Surname"
												type="text"
												name="surname"
												id="user_surname"
												defaultValue={surname}
												onChange={Event =>
													setSurname(Event.target.value)
												}
											/>
										</p>
										<p className="form__p">
											<label
												className="form__label"
												htmlFor="user_email"
											>
												Email
											</label>
											<input
												className="form__input"
												placeholder="Email"
												type="email"
												name="email"
												id="user_email"
												defaultValue={email}
												onChange={Event =>
													setEmail(Event.target.value)
												}
											/>
										</p>
										{/* <p>
											<label
												className="form__label"
												htmlFor="user_password"
											>
												Password
											</label>
											<input
												className="form__input"
												placeholder="Password"
												type="password"
												name="password"
												id="user_password"
												onChange={Event =>
													setPassword(Event.target.value)
												}
											/>
										</p>
										<p>
											<label
												className="form__label"
												htmlFor="user_confirm_password"
											>
												Confirm password
											</label>
											<input
												className="form__input"
												placeholder="Confirm password"
												type="password"
												name="confirmPassword"
												id="user_confirm_password"
												onChange={Event =>
													setConfirmPassword(Event.target.value)
												}
											/>
										</p> */}
									</fieldset>

									<div className="media-uploader">
										<div
											className="media-uploader__body"
											{...getRootProps()}
										>
											<input name="file" {...getInputProps()} />

											<label
												className="media-uploader__label"
												htmlFor="image-uploader"
											>
												{uploading && (
													<div className="media-uploader__loading">
														<FontAwesomeIcon
															className="fa-spinner"
															icon="cog"
														/>
													</div>
												)}

												{image ? (
													<img
														src={image}
														className="media-uploader__image-preview"
														alt=""
													/>
												) : (
													<img
														src={`https://api.adorable.io/avatars/285/${email}`}
														className="media-uploader__image-preview"
														alt=""
													/>
												)}
											</label>
										</div>
									</div>
								</div>
							</div>

							<div className="btn-form-action">
								<button className="btn__link btn__link--green btn-submit">
									Ok, save!
								</button>

								<Link
									to={`/dashboard`}
									className="btn__link btn__link--green btn-submit btn-back"
								>
									Back to dashboard
								</Link>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
}

export default withRouter(requireAuth(UserProfile));
