import React from 'react';
import classes from './Contact.module.scss';

const Contact = (props) => {
	let obj = {
		id: props._id,
		name: props.name,
		email: props.email,
		avatar: props.avatar
	};
	return (
		<section className={classes.contactList}>
			<ul>
				<li>
					<img src={require('../../../assets/img/av.default.png')} alt="portfolio" />
				</li>
				<li>{props.name}</li>
				<li>{props.email}</li>
				<li onClick={() => props.showUpdateContact(obj)}>
					<img
						className={classes.iconImg}
						src={require('../../../assets/img/user-edit-solid.svg')}
						alt="edit"
					/>{' '}
				</li>
				<li onClick={props.sendEmail}>
					<img
						className={classes.iconImg}
						src={require('../../../assets/img/sendEmail.svg')}
						alt="edit"
					/>{' '}
				</li>
				<li onClick={() => props.deleteContactList(props._id)}>
					<img
						className={classes.iconImg}
						src={require('../../../assets/img/delete-user.svg')}
						alt="remove"
					/>{' '}
				</li>
			</ul>
		</section>
	);
};

export default Contact;
