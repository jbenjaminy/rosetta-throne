var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var DirectoryLink = React.createClass({
	getPreview: function(level, lesson, classes) {
		var props = this.props;
		return function() {
			if (classes === 'lesson-links completed') {
				this.props.dispatch({
				 	type: 'server/restartQuiz',
					data: {
				    	currentLevel: level,
				    	currentLesson: lesson,
				    	completed: this.props.completed
				  	}
				});
			} else if (classes === 'level-links completed') {
				this.props.dispatch({
					type: 'server/restartQuiz',
					data: {
				    	currentLevel: level,
				    	currentLesson: lesson,
				    	completed: this.props.completed
				  	}
				});
				this.props.dispatch({
					type: 'server/updateCompleted',
					data: {
				    	currentLevel: level,
				    	currentLesson: '2',
				    	funct: 'remove',
				    	completed: this.props.completed
				  	}
				});
				this.props.dispatch({
					type: 'server/updateCompleted',
					data: {
				    	currentLevel: level,
				    	currentLesson: '3',
				    	funct: 'remove',
				    	completed: this.props.completed
				  	}
				});
				this.props.dispatch({
					type: 'server/updateCompleted',
					data: {
				    	currentLevel: level,
				    	currentLesson: '4',
				    	funct: 'remove',
				    	completed: this.props.completed
				  	}
				});
				this.props.dispatch({
					type: 'server/updateCompleted',
					data: {
				    	currentLevel: level,
				    	currentLesson: '5',
				    	funct: 'remove',
				    	completed: this.props.completed

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
					type: 'server/updateLesson',
					data: {
						currentLevel: level,
		        		currentLesson: lesson
		      		}
				});
			}
		};
	},
	render: function() {
		var classes = '';
		var level = this.props.level;
		var lesson = this.props.lesson;
		var completed = this.props.completed;
		if (this.props.type === 'li') {
			classes = 'lesson-links ';
			completed.forEach(function(lesson) {
				if ((lesson.lesson = this.props.lesson) && (lesson.level === this.props.level)) {
					classes += 'completed';
				}
			});
			return <li className={classes}><Link to={'/practice'} onClick={this.getPreview(level, lesson, classes)}>{this.props.title}</Link></li>
		}
		classes = 'level-links ';
		var finishedLessons = 0;
		completed.forEach(function(lesson) {for (lesson of completed) {
			if (lesson.level === this.props.level) {
				finishedLessons++;
			}
			if (finshedLessons === 5) {
				classes += 'completed';
			}
		});
    	return <Link to={'/practice'} onClick={this.getPreview(level, lesson, classes)}><h2 className={classes}>{this.props.title}</h2></Link>
	}
});

var mapStateToProps = function(state, props) {
  	return {
    	completed: state.user.completedLessons
  	}
};

module.exports = connect(mapStateToProps)(DirectoryLink);
