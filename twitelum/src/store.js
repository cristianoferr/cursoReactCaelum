import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


function tweetsReducer(state = { lista: [], tweetAtivo: {} }, action = {}) {
    console.log("====================" + action.type);
    console.log(state);
    if (action.type === 'CARREGA_TWEETS') {
        return {
            ...state,
            lista: action.tweets
        };
    }


    if (action.type === 'LIKE') {
        const lista = state.lista.filter(tweet => {
            if (tweet._id === action.idTweetLikeado) {
                const { likeado, totalLikes } = tweet;
                if (tweet.likeado) {
                    tweet.likes = tweet.likes.filter(like => like.usuario.login !==action.liker);
                } else {
                    tweet.likes = [{ usuario: { login: action.liker } }, ...tweet.likes];
                }
                tweet.likeado = !likeado;
                tweet.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1;
            }
            return tweet;
        });

        const tweetAtivoAtualizado = lista.find(tweet => tweet._id === state.tweetAtivo._id);
        return {
            tweetAtivo: { ...tweetAtivoAtualizado } || {},
            lista
        };
    }

    if (action.type === 'ADICIONA_TWEET') {
        // state = [action.novoTweet, ...state];
        return { ...state, lista: [action.novoTweet, ...state.lista] };
    }

    if (action.type === 'REMOVE_TWEET') {
        const lista = state.lista.filter((tweet) => tweet._id !== action.idDoTweet);
        return { ...state, lista: lista };

    }

    if (action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: {}
        };
    }

    if (action.type === 'ADD_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: action.tweetSelecionado
        };
    }

    return state;
}


const store = createStore(tweetsReducer, applyMiddleware(thunk));
console.log('Primeira versáo da store:', store.getState());
//this.context.store=store;
export default store;
