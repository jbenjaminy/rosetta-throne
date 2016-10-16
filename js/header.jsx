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
    		<div className='title'>
          <Link to={'/'} className="title1 col" ><img src="./title1.png"/></Link><Link to={'/directory'} className="title2 col"><img src="./title2.png"/></Link>
        </div>
        <Link to={'/practice'} className="start" onClick={this.getPreview}>Start learning</Link>
        <div className='space'></div>
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
