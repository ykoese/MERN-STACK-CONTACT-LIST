import React from 'react';
import { Link } from 'react-router-dom';
import Classes from '../Form.module.scss';
import axios from 'axios';

class Login extends React.Component {
	state = {
		failed: false,
		errors: []
	};
	componentDidMount() {
		console.log(sessionStorage.getItem('loginStatus'));

		if (sessionStorage.getItem('loginStatus') === 'true') {
			this.props.history.push('/dashboard');
		}
	}
	emailRef = React.createRef();
	passwordRef = React.createRef();

	validation(obj) {
		let errors = [];
		let isValid = true;
		const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

		if (!emailReg.test(obj.email)) {
			errors.push({ msg: 'Please enter your email address' });
			isValid = false;
		}
		if (obj.password.trim().length < 6) {
			errors.push({ msg: 'Your password should be more than 6 letter' });
			isValid = false;
		}
		this.setState({ errors, failed: true });
		return isValid;
	}
	userLogged = (e) => {
		e.preventDefault();
		let obj = {
			email: this.emailRef.current.value,
			password: this.passwordRef.current.value
		};
		if (this.validation(obj)) {
			axios
				.post('/loginUser', { ...obj })
				.then((response) => {
					const userData = {
						id: response.data.id,
						name: response.data.name,
						email: response.data.email,
						date: response.data.date
					};
					console.log(userData);

					if (response.data.status === 'success') {
						this.setState({ failed: false });
						sessionStorage.setItem('loginStatus', 'true');
						sessionStorage.setItem('state', JSON.stringify(userData));
						this.props.updateLoginState('true');
						this.props.history.push('/dashboard');
					} else {
						this.setState({ failed: true });
						this.passwordRef.current.value = '';
						this.setState({ errors: response.data.errors });
					}
				})
				.catch((err) => {
					this.setState({ errors: [ { msg: 'There Was a problem with server, Please try again later' } ] });
				});
		} else {
			this.passwordRef.current.value = '';
		}
	};
	render() {
		return (
			<section className={Classes.containerForm}>
				<h1>
					<img src={require('../../../assets/img/user-solid.svg')} alt="user-img" />Login
				</h1>
				{this.state.errors.map((error, index) => (
					<p className={Classes.error} key={index}>
						{error.msg}
					</p>
				))}
				<form onSubmit={this.userLogged}>
					<label>Email</label>
					<img className={Classes.inputImg} src={require('../../../assets/img/email-img.svg')} alt />
					<input type="text" placeholder="Enter Email" ref={this.emailRef} /> <label>Password</label>
					<img className={Classes.inputImg} src={require('../../../assets/img/password.svg')} alt />
					<input type="password" placeholder="Create Password" ref={this.passwordRef} />
					<input type="submit" value="Login" />
				</form>
				<p>
					Create a Account? <Link to="/register">Register</Link>
				</p>
			</section>
		);
	}
}
export default Login;
