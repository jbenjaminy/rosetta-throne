var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var Provider = require( 'react-redux' ).Provider;
var store = require( './store' );
var actions = require( './actions' );
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var LandingPage = require('./landing-page')
var QuizPage = require('./quiz-page')
import { applyRouterMiddleware, hashHistory, Router }  from 'react-router';

// This acts as the big container
var App = function(props) {
  return (
    //props.children will render the routes (Index or )
    <div>
      {props.children}
    </div>
  );
};

var routes = (
  <Route path='/' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='practice' component={QuizPage} />
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
