import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import LandingPage from './components/landing-page';
import PracticePage from './components/practice-page';
import QuizPage from './components/quiz-page';
import Directory from './components/directory';

let App = (props) => {
	return (
		<div>
			{props.children}
		</div>
	);
};

const routes = (
	<Router history={browserHistory}>
  		<Route path='/' component={App}>
	    	<IndexRoute component={LandingPage} />
	    	<Route path='practice' component={PracticePage} />
	    	<Route path='quiz' component={QuizPage} />
	    	<Route path='directory' component={Directory} />
	  	</Route>
	</Router>
);

export default routes;