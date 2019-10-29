import React from 'react';
import Classes from './UpdateContact.module.scss';
import axios from 'axios';

class UpdateContact extends React.Component {
	state = {
		name: this.props.name,
		email: this.props.email,
		failed: false,
		errors: []
	};
	nameRef = React.createRef();
	emailRef = React.createRef();
	changeInput = (e) => {
		if (e.target.name === 'name') {
			this.setState({ name: e.target.value });
		} else {
			this.setState({ email: e.target.value });
		}
	};
	validation(obj) {
		let errors = [];
		let isValid = true;
		const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (obj.name.trim().length < 2) {
			errors.push({ msg: 'Please enter your Full name' });
			isValid = false;
		}
		if (!emailReg.test(obj.email)) {
			errors.push({ msg: 'Please enter your email address' });
			isValid = false;
		}
		this.setState({ errors, failed: true });
		return isValid;
	}
	update = (e) => {
		e.preventDefault();
		let obj = {
			id: this.props.id,
			name: this.state.name,
			email: this.state.email
		};
		if (this.validation(obj)) {
			axios
				.post('/updateContact', { ...obj })
				.then((res) => {
					console.log(res);
					if (res.data.status === 'success') {
						this.setState({ failed: false });
						console.log(res);
						this.props.updateContactState(JSON.parse(res.config.data));
					} else {
						this.setState({ failed: true });
						this.setState({ errors: res.data.errors });
					}
				})
				.catch((err) => {
					this.setState({ errors: [ { msg: 'There was a problem with server, Please try again later.' } ] });
				});
		}
	};
	render() {
		this.nameRef = this.props.name;
		return (
			<section className={Classes.containerForm}>
				<img className={Classes.img} src={require('../../../assets/img/av.default.png')} alt="user-img" />
				{this.state.errors.map((error, index) => (
					<p className={Classes.error} key={index}>
						{error.msg}
					</p>
				))}
				<form onSubmit={this.update}>
					<label>Name</label>
					<input
						type="text"
						name="name"
						placeholder="Enter Name"
						value={this.state.name}
						onChange={this.changeInput}
					/>
					<label>Email</label>
					<input
						type="text"
						name="email"
						placeholder="Enter Email"
						value={this.state.email}
						onChange={this.changeInput}
					/>
					<input type="submit" value="Update" />
				</form>
			</section>
		);
	}
}

export default UpdateContact;
