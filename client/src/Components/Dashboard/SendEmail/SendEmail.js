import React from 'react';
import classes from './SendEmail.module.scss';

class SendEmail extends React.Component {
	state = {
		// formData: {}
	};
	refName = React.createRef();
	refTo = React.createRef();
	refCc = React.createRef();
	refMessage = React.createRef();
	refUser = React.createRef();
	refPassword = React.createRef();

	collectData = (e) => {
		e.preventDefault();
		let formData = {
			from: this.refName.current.value,
			to: this.refTo.current.value,
			cc: this.refCc.current.value,
			message: this.refMessage.current.value,
			user: this.refUser.current.value,
			pass: this.refPassword.current.value
		};
		this.props.SendEmail(formData);
	};
	render() {
		return (
			<section className={classes.containerForm}>
				<form onSubmit={this.collectData}>
					<h1>
						<img src={require('../../../assets/img/av.default.png')} alt="img" />Mohammad
					</h1>
					<input type="text" placeholder="from" ref={this.refName} />
					<input type="email" placeholder="to" ref={this.refTo} />
					<input type="text" placeholder="cc" ref={this.refCc} />
					<textarea placeholder="your message" ref={this.refMessage} />
					<input type="file" name="file" />
					<input type="email" placeholder="gmail address" ref={this.refUser} />
					<input type="password" placeholder="gmail password" ref={this.refPassword} />
					<input type="submit" value="Send" />
				</form>
			</section>
		);
	}
}
export default SendEmail;
