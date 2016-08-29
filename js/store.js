import { createStore, applyRouterMiddleware, compose} from 'redux';
var reducers = require('./reducers');
var actions = require('./actions');
var thunk = require('redux-thunk').default;

var store = createStore(reducers, compose( applyMiddleware(thunk),
window.devToolsExtension ? window.devToolsExtension() : f => f));

module.exports = store;
