var React = require('react');
var actions = require('./actions');
var Header = require('./header');
var connect = require('react-redux').connect;
var router = require('react-router');
var Link = router.Link;

var PracticePage = React.createClass({
  onFormSubmit: function() {
    this.props.dispatch(actions.incrementQuestion());
  },
  getQuestions: function() {
    this.props.dispatch(actions.fetchQuestions());
  },

  render: function() {
    // console.log(this.props.state, 'state')
  if (this.props.startQuiz) {
      return <Link to={'/quiz'} className="start" onClick={this.getQuestions}>Begin Quiz</Link>
  }
  if (!this.props.previewQuestions) {
    return null
  }
  var question = this.props.previewQuestions[this.props.questionNumber];
    return (
      <div className='quizPage'>
        <Header cls='header2'/>
        <div className='prompt'>{question.prompt}</div>
        <form onSubmit={this.onFormSubmit}>
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
    previewQuestions: state.previewQuestions,
    questionsNumber: state.questionNumber,
    startQuiz: state.startQuiz
  }
}

module.exports = connect(mapStateToProps)(PracticePage);
