import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


function tweetsReducer(state = [], action = {}) {
    if (action.type === 'CARREGA_TWEETS') {
        state = action.tweets;
    }
    if (action.type === 'ADICIONA_TWEET') {
        state = [action.novoTweet, ...state];
    }
    if (action.type === 'REMOVE_TWEET') {
        state = state.filter((tweet) => tweet._id != action.idDoTweet);
    }
    console.log("====================" + action.type);
    console.log(state);
    return state;
}

function createStore_(reducer) {
    class Store {
        listeners = [];
        state = [];

        constructor(reducer) {
            this.reducer = reducer;
        }

        getState = () => {
            return this.state;
        }

        subscribe = (func) => {
            this.listeners.push(func);
        }

        dispatch = (action) => {
            this.state = this.reducer(this.state, action);
            this.listeners.forEach(f => f());
        }

    }

    return new Store(reducer);
}

const store = createStore(tweetsReducer, applyMiddleware(thunk));
console.log('Primeira versáo da store:', store.getState());
//this.context.store=store;
export default store;
