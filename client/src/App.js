import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './Components/FormContainer/Register/Register';
import Login from './Components/FormContainer/Login/Login';
import NavBar from './Components/Nav/NavBar';
import Home from './Components/Home/Home';
import DashBoard from './Components/Dashboard/DashBoard';

class App extends React.Component {
	state = {
		loginStatus: sessionStorage.getItem('loginStatus')
	};
	updateLoginState = (status) => {
		this.setState({ loginStatus: status });
	};
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<NavBar loginStatus={this.state.loginStatus} updateLoginState={this.updateLoginState} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/register/" component={Register} />
						<Route
							path="/login/"
							render={(props) => <Login {...props} updateLoginState={this.updateLoginState} />}
						/>
						<Route path="/dashboard/" component={DashBoard} />
						{/* <Route component={NotExist} /> */}
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
