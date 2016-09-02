var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var actions = require('./actions');
var Header = require('./header');


var PracticePage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    this.props.dispatch(actions.incrementQuestion());
    var form = document.getElementById("gotForm");
    form.reset();
  },
  getQuestions: function() {
    this.props.dispatch(actions.fetchQuestions(this.props.level, this.props.lesson));
  },
  render: function() {
    if (this.props.startQuiz) {
      return (
        <div className='quizPage'>
          <Header cls='header2'/>
          <Link to={'/quiz'} className="continue" onClick={this.getQuestions}>Begin Quiz</Link>
        </div>
      );
    }
    if (!this.props.previewQuestions) {
      return null
    }
    var question = this.props.previewQuestions[this.props.questionNumber];
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
    level: state.level,
    lesson: state.lesson,
    previewQuestions: state.previewQuestions,
    questionNumber: state.questionNumber,
    startQuiz: state.startQuiz
  }
}

module.exports = connect(mapStateToProps)(PracticePage);
