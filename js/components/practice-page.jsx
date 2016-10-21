var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var Header = require('./header');


var PracticePage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    this.props.dispatch({
      type: 'server/incrementQuestion',
      data: {
        questionNumber: this.props.questionNumber,
        questions: this.props.questions
      }
    });
    var form = document.getElementById("gotForm");
    form.reset();
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
  render: function() {
    console.log('state----->', this.props.state);
    if (this.props.startQuiz) {
      return (
        <div className='quizPage'>
          <Header cls='header2'/>
          <Link to={'/quiz'} className="continue" onClick={this.getQuestions}>Begin Quiz</Link>
        </div>
      );
    }
    if (this.props.questions.length === 0) {
      return null
    } else {
      var question = this.props.questions[this.props.questionNumber];
    }
    return (
      <div className='quizPage'>
        <Header cls='header2'/>
        <div className='info'>
          <h2>Level&nbsp;{question.level}:&nbsp;{question.levelTitle}</h2>
          <h2>Lesson&nbsp;{question.lesson}:&nbsp;{question.lessonTitle}</h2>
        </div>
        <div className='prompt'>{question.prompt}</div>
        <form onSubmit={this.onFormSubmit} id='gotForm'>
          <input type="text" ref="userInput" placeholder={question.placeHolder} required/>
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
    questionNumber: state.quiz.questionNumber,
    startQuiz: state.quiz.startQuiz
  }
}

module.exports = connect(mapStateToProps)(PracticePage);
