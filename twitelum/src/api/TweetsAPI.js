export const carrega = () => {
    return (dispatch) => {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
        ).then(response => response.json())
            .then(tweets => {
                dispatch({ type: 'CARREGA_TWEETS', tweets });
            });
    }
}



export const adiciona = (novoTweet) => {
    return (dispatch) => {
        if (novoTweet) {

            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conteudo: novoTweet })
            }).then(response => response.json())
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
        fetch(`https://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch({ type: 'REMOVE_TWEET', idDoTweet });
                //this.atualizaTweets();
            });
    }
}