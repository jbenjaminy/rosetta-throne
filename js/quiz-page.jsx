var React = require('react');
var actions = require('./actions');
var Header = require('./header');
var connect = require('react-redux').connect;

var QuizPage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    var question = this.props.questions[0];
    if (this.refs.userInput.value === question.correctAnswer) {
      this.props.dispatch(actions.updateMvalue(question.m + 1, question._id))
    } else {
    // Don't decrement below 1
     this.props.dispatch(actions.updateMvalue(question.m - 1, question._id))
    }

    if (this.props.questions.length === 0) {
      this.props.dispatch(actions.pageLoad());
    }
  },
  refreshQuestions: function() {
    this.props.dispatch(actions.fetchQuestions());
  },

  render: function() {
    console.log(this.props.state, 'state')
    if (this.props.refreshQuestions) {
      this.refreshQuestions()
    }
   if (!this.props.questions) {
     return null
   }
    return (
      <div className='quizPage'>
        <Header cls='header2'/>
        <div className='prompt'>{this.props.questions[0].prompt}</div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" ref="userInput" placeholder="Enter English translation" required/>
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
    questions: state.questions,
    refreshQuestions: state.refreshQuestions
  }
}

module.exports = connect(mapStateToProps)(QuizPage);
