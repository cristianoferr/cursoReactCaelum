import ApiService from './ApiService.js'

export const carrega = () => {
    return (dispatch) => {
        ApiService.carregaTweets().then(response => response.json())
            .then(tweets => {
                dispatch({ type: 'CARREGA_TWEETS', tweets });
            });
    }
}



export const adiciona = (novoTweet) => {
    return (dispatch) => {
        if (novoTweet) {
            ApiService.adicionaTweet(novoTweet).then(response => response.json())
                .then(novoTweetRegistrado => {
                    /* this.setState({
                       tweets: [novoTweetRegistrado, ...tweets],
                       novoTweet: ''
                     });*/
                    dispatch({ type: 'ADICIONA_TWEET', novoTweet: novoTweetRegistrado });

                });

        }
    }
}

export const remove = (idDoTweet) => {
    return (dispatch) => {
        ApiService.removeTweet(idDoTweet)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch({ type: 'REMOVE_TWEET', idDoTweet });
                dispatch({ type: 'REMOVE_TWEET_ATIVO' });
                //this.atualizaTweets();
            });
    }
}