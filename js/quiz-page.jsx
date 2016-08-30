var React = require('react');
var actions = require('./actions');
var connect = require('react-redux').connect;

var QuizPage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    this.props.dispatch(actions.submitAnswer(this.refs.userInput.value));
    if (this.props.questionNumber > this.props.questions.length - 2) {
      this.props.dispatch(actions.pageLoad());
    }
  },

  render: function() {
    console.log(this.props.state, 'state')
   if (!this.props.questions) {
     return null
   }
    return (
      <div>
        <div>{this.props.questions[this.props.questionNumber].prompt}</div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" ref="userInput" placeholder="Your answer" required/>
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
    questionNumber: state.questionNumber
  }
}

module.exports = connect(mapStateToProps)(QuizPage);
