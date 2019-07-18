const API_URL="https://twitelum-api.herokuapp.com";

class ApiService {
  static carregaTweets = () => {
        return fetch(`${API_URL}/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
        )
    }

   static adicionaTweet = (novoTweet) => {
        return fetch(`${API_URL}/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conteudo: novoTweet })
        });
    }

   static removeTweet = (idDoTweet) => {
        return fetch(`${API_URL}/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        });
    }
}

export default  ApiService;