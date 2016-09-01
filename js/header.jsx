var React = require('react');
var router = require('react-router');
var actions = require('./actions');
var connect = require('react-redux').connect;
var Link = router.Link;

var Header = React.createClass({

  getQuestions: function(event) {
    this.props.dispatch(actions.fetchPreview());
  },

  render: function() {
    return(
    	<div className={this.props.cls}>
    		<div className='title'><h1 className='rosetta'>Rosetta</h1><img src='./throne.png' className='throne'/><div className='course'><h2 className='dothraki'>DOTHRAKI</h2><hr/><h3>Level 1, 2, 3, 4, 5</h3></div><img src='./wolf.png' className='wolf'/></div>
        <Link to={'/practice'} className="start" onClick={this.getQuestions}>Start learning</Link>
		  </div>
    );
  }
});

module.exports = connect()(Header);
