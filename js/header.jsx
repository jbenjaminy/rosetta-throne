var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var actions = require('./actions');

var Header = React.createClass({

  getPreview: function() {
    this.props.dispatch(actions.fetchPreview(this.props.level, this.props.lesson));
  },

  render: function() {
    return(
    	<div className={this.props.cls}>
    		<div className='title'><h1 className='rosetta'>Rosetta</h1><img src='./throne.png' className='throne'/><div className='course'><h2 className='dothraki'>DOTHRAKI</h2><hr/><h3>Level 1, 2, 3, 4, 5</h3></div><img src='./wolf.png' className='wolf'/></div>
        <Link to={'/practice'} className="start" onClick={this.getPreview}>Start learning</Link>
		  </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    level: state.level,
    lesson: state.lesson,
  }
}

module.exports = connect(mapStateToProps)(Header);
