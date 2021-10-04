import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route path="/" component={Home}></Route>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
