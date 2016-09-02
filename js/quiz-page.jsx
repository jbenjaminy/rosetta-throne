var React = require('react');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var actions = require('./actions');
var Header = require('./header');

var QuizPage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    var question = this.props.questions[0];
    if (this.refs.userInput.value === question.correctAnswer) {
      this.props.dispatch(actions.updateMvalue(question.m + 1, question._id))
    } else {
     var mUpdate = question.m - 1;
     if (mUpdate > 0) {
       this.props.dispatch(actions.updateMvalue(mUpdate, question._id))
     }
    }
    var form = document.getElementById("gotForm");
    form.reset();
  },
  refreshQuestions: function() {
    this.props.dispatch(actions.fetchQuestions(this.props.level, this.props.lesson));
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
    this.props.dispatch(actions.fetchPreview(level, lesson));
    this.props.dispatch(actions.incrementLesson());
  },
  getQuestions: function() {
    this.props.dispatch(actions.fetchQuestions(this.props.level, this.props.lesson));
  },
  render: function() {
    console.log(this.props.state);
    if (this.props.refreshQuestions) {
      this.refreshQuestions()
    }
    if (!this.props.questions) {
      return null
    }
    if (this.props.questions.length === 0) {
      return (
        <div>
          <Header cls='header2'/>
          <div className='endLinks'>
            <Link to={'/quiz'} className="quizEnd" onClick={this.getQuestions}>Restart Quiz</Link>
            <Link to={'/practice'} className="quizEnd" onClick={this.getPreview}>Next Lesson</Link>
            <Link to={'/'} className="quizEnd">Return Home</Link>
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
    level: state.level,
    lesson: state.lesson,
    questions: state.questions,
    refreshQuestions: state.refreshQuestions,
    startQuiz: state.startQuiz
  }
}

module.exports = connect(mapStateToProps)(QuizPage);
