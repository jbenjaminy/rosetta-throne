var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var DirectoryLink = React.createClass({
	getPreview: function(level, lesson, classes) {
		var props = this.props;
		return function() {
			if (classes === 'dir-links completed') {
				this.props.dispatch({
				  type: 'server/restartQuiz',
				  data: {
				    currentLevel: level,
				    currentLesson: lesson
				  }
				});
			} else {
				props.dispatch({
			      type: 'server/getPreviewQuestions',
			      data: {
			        currentLevel: level,
			        currentLesson: lesson
			      }
			    });
				props.dispatch({
					type: 'server/updateLevel',
					data: {
						currentLevel: level,
		        		currentLesson: lesson
		      		}
				});
			}
		};
	},
	render: function() {
		var classes = 'dir-links ';
		var level = this.props.level;
		var lesson = this.props.lesson;
		var completed = this.props.completed;
		if (this.props.type === 'li') {
			for (lesson of completed) {
				if ((lesson.lesson = this.props.lesson) && (lesson.level === this.props.level)) {
					classes += 'completed';
				}
			}
			return <li className={classes}><Link to={'/practice'} onClick={this.getPreview(level, lesson, classes)}>{this.props.title}</Link></li>
		}
		var finishedLessons = 0;
		for (lesson of completed) {
			if (lesson.level === this.props.level) {
				finishedLessons++;
			}
			if (finshedLessons === 5) {
				classes += 'completed';
			}
		}
    	return <Link to={'/practice'} onClick={this.getPreview(level, lesson, classes)}><h2 className={classes}>{this.props.title}</h2></Link>
	}
});

var mapStateToProps = function(state, props) {
  return {
    completed: state.user.completedLessons
  }
};

module.exports = connect(mapStateToProps)(DirectoryLink);
