var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var DirectoryLink = React.createClass({
	restart: function(level, lesson, completed) {
		var props = this.props;
		return function() {
			props.dispatch({
			 	type: 'server/restartQuiz',
				data: {
			    	currentLevel: level,
			    	currentLesson: lesson,
			    	completed: completed
			  	}
			});		
		};
	},
	render: function() {
		var level = this.props.level;
		var lesson = this.props.lesson;
		var completed = this.props.completed;
		var	classes = 'links ';
		completed.forEach(function(lesson) {
			if ((lesson.lesson = this.props.lesson) && (lesson.level === this.props.level)) {
				classes += 'completed';
			}
		});

		return <li className={classes}><Link to={'/practice'} onClick={this.restart(level, lesson, completed)}>{this.props.title}</Link></li>
	}
});

var mapStateToProps = function(state, props) {
  	return {
    	completed: state.user.completedLessons
  	}
};

module.exports = connect(mapStateToProps)(DirectoryLink);
