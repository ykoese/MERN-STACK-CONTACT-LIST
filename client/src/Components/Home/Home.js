import React from "react";
import classes from "./Home.module.scss";


class Home extends React.Component{
    componentDidMount(){
        console.log(sessionStorage.getItem('loginStatus'));

		if(sessionStorage.getItem('loginStatus') === "true"){
			this.props.history.push('/dashboard')
		}
    }
    render(){

    return(
        <section className={classes.home}>
            <h1>Welcome to Maily</h1>
            <p>
                Our website is giving you the possibility to upload your contact list and you can use our server to send mail
            </p>
        </section>
    );
}
}

export default Home;
