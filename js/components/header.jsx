var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var Header = React.createClass({
  getPreview: function() {
    this.props.dispatch({
      type: 'server/getPreviewQuestions',
      data: {
        currentLevel: this.props.level,
        currentLesson: this.props.lesson
      }
    });
  },
  render: function() {
    return(
    	<div className={this.props.cls}>
    		<div className='title'>
          <Link to={'/'} className="title1 col" ><img src="http://i.imgur.com/UtAVA4T.png"/></Link><Link to={'/directory'} className="title2 col"><img src="http://i.imgur.com/bC89zOl.png"/></Link>
        </div>
        <Link to={'/practice'} className="start" onClick={this.getPreview}>Start learning</Link>
        <div className='space'></div>
		  </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    level: state.user.currentLevel,
    lesson: state.user.currentLesson
  }
}

module.exports = connect(mapStateToProps)(Header);
