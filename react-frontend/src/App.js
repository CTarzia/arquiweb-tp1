import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";

function App() {
	return (
		<div>
			<Router>
				<div className="container">
					<Switch>
						<Route path="/" exact component={Home}></Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
