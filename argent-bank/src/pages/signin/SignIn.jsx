import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setError, clearError } from "../../app/store";
import { fetchData } from "../../services/api";

export const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const error = useSelector((state) => state.auth.error);

	const userInfo = [];

	// Check for token in localStorage on component mount
	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			// Attempt to validate the token or auto-login
			dispatch(login({ userInfo, token: storedToken }));
			navigate("/profile");
		}
	}, [navigate, dispatch]);

	const handleSignin = async () => {
		try {
			dispatch(clearError())
			const response = await fetchData('user/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!data.body.token) {
				throw new Error(data.message || 'Authentication failed.');
			}

			dispatch(login({ token: data.body.token }));

			if (rememberMe) {
				localStorage.setItem('authToken', data.body.token);
			}

			navigate('/profile');
		} catch (err) {
			dispatch(setError(err.message));
		}
	};

	const submitForm = (e) => {
		e.preventDefault(); // Prevent default form submission
		handleSignin(); // Call handleSignin for login
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in__content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={(e) => submitForm(e)}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={ email }
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={ password }
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-remember">
						<label htmlFor="remember-me">Remember me</label>
						<input
							type="checkbox"
							id="remember-me"
							checked={ rememberMe }
							onChange={(e) => setRememberMe(e.target.checked)}
						/>
					</div>
					<button type="submit" className="sign-in__button">
						Sign In
					</button>
					{error && <p className="error-message">{error}</p>}
				</form>
			</section>
		</main>
	);
};