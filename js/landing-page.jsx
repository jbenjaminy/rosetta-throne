var React = require('react');
var router = require('react-router');
var actions = require('./actions');
var connect = require('react-redux').connect;
var Link = router.Link;

var LandingPage = React.createClass({

  getQuestions: function(event) {
    this.props.dispatch(actions.fetchQuestions());
  },

  render: function() {
    return(
        <Link to={'/practice'} className="links" onClick={this.getQuestions}>Start learning</Link>
    );
  }
});

module.exports = connect()(LandingPage);
