var React = require('react');
var router = require('react-router');
var actions = require('./actions');
var Header = require('./header');
var connect = require('react-redux').connect;
var Link = router.Link;

var LandingPage = React.createClass({

  getQuestions: function(event) {
    this.props.dispatch(actions.fetchQuestions());
  },

  render: function() {
    return(
    	<div className='landingPage'>
    		<Header cls='header'/>
        	<Link to={'/practice'} className="start" onClick={this.getQuestions}>Start learning</Link>
    	</div>
    );
  }
});

module.exports = connect()(LandingPage);
