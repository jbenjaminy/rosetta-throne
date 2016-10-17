var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var Header = require('./header');

var QuizPage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    var question = this.props.questions[0];
    if (this.refs.userInput.value === question.correctAnswer) {
      this.props.dispatch({
        type: 'server/updateMvalue',
        data: { 
          mValue: question.m + 1,
          id: question._id,
          level: this.props.level,
          lesson: this.props.lesson
        }
      });
    } else {
     var mUpdate = question.m - 1;
     if (mUpdate > 0) {
       this.props.dispatch({
        type: 'server/updateMvalue',
        data: { 
          mValue: mUpdate,
          id: question._id,
          level: this.props.level,
          lesson: this.props.lesson
        }
      });
     }
    }
    var form = document.getElementById("gotForm");
    form.reset();
  },
  getPreview: function() {
    var lesson = this.props.lesson + 1;
    var level = this.props.level;
    if (lesson === 6) {
      level = this.props.level + 1;
      if (level === 6) {
        level = 1;
      }
      lesson = 1;
    }
    this.props.dispatch({
      type: 'server/getPreviewQuestions',
      data: {
        currentLevel: level,
        currentLesson: lesson
      }
    });
    this.props.dispatch({
      type: 'server/incrementLesson',
      data: {
        currentLevel: this.props.level,
        currentLesson: this.props.lesson
      }
    });
    this.props.dispatch({
      type: 'server/updateCompleted',
      data: { 
        currentLevel: this.props.level,
        currentLesson: this.props.lesson,
        funct: 'add'
      }
    });
  },
  getQuestions: function() {
    this.props.dispatch({
      type: 'server/getQuizQuestions',
      data: { 
        currentLevel: this.props.level,
        currentLesson: this.props.lesson
      }
    });  
  },
  restart: function() {
    this.props.dispatch({
      type: 'server/restartQuiz',
      data: {
        currentLevel: this.props.level,
        currentLesson: this.props.lesson
      }
    });
  },
  markComplete: function() {
    this.props.dispatch({
      type: 'server/updateCompleted',
      data: { 
        currentLevel: this.props.level,
        currentLesson: this.props.lesson,
        funct: 'add'
      }
    });
    this.props.dispatch({
      type: 'server/incrementLesson',
      data: {
        currentLevel: this.props.level,
        currentLesson: this.props.lesson
      }
    });
  },
  render: function() {
    if (this.props.questions.length === 0) {
      return (
        <div>
          <Header cls='header2'/>
          <div className='endLinks quizPage'>
            <Link to={'/quiz'} className="quizEnd" onClick={this.restart}>Restart Quiz</Link>
            <Link to={'/practice'} className="quizEnd" onClick={this.getPreview}>Next Lesson</Link>
            <Link to={'/'} className="quizEnd" onClick={this.markComplete}>Return Home</Link>
          </div>
        </div>
      );
    }
    return (
      <div className='quizPage'>
        <Header cls='header2'/>
        <div className='info'>
          <h2>Level&nbsp;{this.props.questions[0].level}:&nbsp;{this.props.questions[0].levelTitle}</h2>
          <h2>Lesson&nbsp;{this.props.questions[0].lesson}:&nbsp;{this.props.questions[0].lessonTitle}</h2>
        </div>
        <div className='prompt'>{this.props.questions[0].prompt}</div>
        <form onSubmit={this.onFormSubmit} id='gotForm'>
          <input type="text" ref="userInput" placeholder="Enter English Translation" required/>
          <br/>
          <button type="submit" id="submit-button">Submit answer</button>
        </form>
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
  return {
    state: state,
    level: state.user.currentLevel,
    lesson: state.user.currentLesson,
    questions: state.quiz.questions,
    startQuiz: state.quiz.startQuiz
  }
};

module.exports = connect(mapStateToProps)(QuizPage);
