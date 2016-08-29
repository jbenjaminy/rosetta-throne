var React = require('react');
var actions = require('./actions');
var connect = require('react-redux').connect;

var QuizPage = React.createClass({
  onFormSubmit: function(event) {
    event.preventDefault();
    //this.props.dispatch(actions.submitAnswer(this.refs.userInput.value));
  },

  render: function() {
    return (
      <div>
        <div>{this.props.questions}</div>
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
    questions: "state.questions"
  }
}

module.exports = connect(mapStateToProps)(QuizPage);
