var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require( 'react-redux' ).Provider;

var router = require('react-router');
var Route = router.Route;
var IndexRoute = router.IndexRoute;

import { applyRouterMiddleware, hashHistory, Router }  from 'react-router';
import { useScroll } from 'react-router-scroll';

var actions = require('./actions');
var store = require( './store' );
var LandingPage = require('./landing-page');
var PracticePage = require('./practice-page');
var QuizPage = require('./quiz-page');
var Directory = require('./directory');

// This acts as the big container
var App = function(props) {
  return (
    <div>
      {props.children}
    </div>
  );
};

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='practice' component={PracticePage} />
    <Route path='quiz' component={QuizPage} />
    <Route path='directory' component={Directory} />
  </Route>
)

// The page loads {routes} instead of a component which will look up and render the index page and load the app
document.addEventListener( 'DOMContentLoaded', function() {
 store.dispatch(actions.pageLoad());
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={hashHistory}
        routes={routes}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>, document.getElementById( 'app' ) );
} );
