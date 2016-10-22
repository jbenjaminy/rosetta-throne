let initialState = {
  user: {
    currentLevel: 1,
    currentLesson: 1,
    completedLessons: []
  },
  quiz: {
    questions: [],
    questionNumber: null,
    startQuiz: false
  }
}

function reducer(state=initialState, action) {
  // console.log('ACTION.TYPE ----->', action.type, 'ACTION.DATA ----->', action.data);
  switch(action.type) {
    case 'updateUser': {
      let currentLevel = action.data.currentLevel || state.currentLevel;
      let currentLesson = action.data.currentLesson || state.user.currentLesson;
      let completedLessons = action.data.completedLessons || state.user.completedLessons;
      return Object.assign({}, state, {
        user: {
          currentLevel: currentLevel,
          currentLesson: currentLesson,
          completedLessons: completedLessons
        }
      });
    }
    case 'updateQuiz': {
      let questions = action.data.questions || state.quiz.questions;
      console.log('q', questions);
      let questionNumber = action.data.questionNumber;
      let startQuiz = action.data.startQuiz || false;
      return Object.assign({}, state, {
        quiz: {
          questions: questions,
          questionNumber: questionNumber,
          startQuiz: startQuiz,
        }
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;