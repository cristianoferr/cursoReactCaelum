import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetPadrao'
import Modal from '../../components/Modal'
import { ReactReduxContext } from 'react-redux';
import * as TweetsAPI from '../../api/TweetsAPI';

class Home extends Component {
  static contextType = ReactReduxContext;
  constructor() {
    super();
    this.state = {
      novoTweet: '',
      maxLength: 140,
      userName: '@cristiano',
      nomeUsuario: 'Cristiano',
      tweets: [],
      tweetAtivo: {}
    };
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({
        tweets: this.context.store.getState().tweets.lista,
        tweetAtivo: this.context.store.getState().tweets.tweetAtivo,
      });
    });

  }

  componentDidMount() {
    console.log(this.context);
    this.context.store.dispatch(TweetsAPI.carrega());
    //this.atualizaTweets();
  }

  abreModalParaTweet = (event, idDoTweet) => {
    if (event.target.classList.contains("pointerFix")) {
      return;
    }
    const tweetSelecionado = this.state.tweets.find(tweet => tweet._id === idDoTweet);
    /*const isTweetFooter = event.target.closest('.tweet__footer');
    if (isTweetFooter) return false;
    this.setState({ tweetAtivo: tweetSelecionado });*/
    this.context.store.dispatch({ type: "ADD_TWEET_ATIVO", tweetSelecionado });
  }

  fechaModal = (event) => {
    if (event.target.classList.contains("pointerFix")) {
      return;
    }
    /*const isModal = event.target.closest('.widget');
    if (!isModal) {
      this.setState({ tweetAtivo: {} });
    }*/
    this.context.store.dispatch({ type: "REMOVE_TWEET_ATIVO" });
  }

  atualizaTweets = () => {
    fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`
    ).then(response => response.json())
      .then(tweets => {
        //this.setState({ tweets });
        this.context.store.dispatch({ type: 'CARREGA_TWEETS', tweets });
      });
  }

  adicionaTweet = event => {
    event.preventDefault();
    this.context.store.dispatch(TweetsAPI.adiciona(this.state.novoTweet));
    this.setState({ novoTweet: '' });
  };

  /*
  removeTweet = idDoTweet => {
    this.context.store.dispatch({type:'REMOVE_TWEET',idDoTweet});
    
  }
*/

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={this.state.userName} />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${this.state.novoTweet.length > this.state.maxLength ? 'novoTweet__status--invalido' : ''}`}>
                    {this.state.novoTweet.length}/{this.state.maxLength}</span>
                  <textarea value={this.state.novoTweet} onInput={(event) => this.setState({ novoTweet: event.target.value })}
                    className="novoTweet__editor" placeholder="O que está acontecendo?"></textarea>
                </div>
                <button type="submit" disabled={this.state.novoTweet.length === 0 || this.state.novoTweet.length > this.state.maxLength} className="novoTweet__envia">Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              {
                this.context.store.getState().notificacao &&
                <div className="notificacaoMsg">
                  {this.context.store.getState().notificacao}
                </div>
              }
              <div className="tweetsArea">
                {
                  this.state.tweets.map((tweet, index) => {
                    return <Tweet key={tweet._id}
                      tweetInfo={tweet} conteudo={tweet.conteudo}
                      handleAbreModalParaTweet={(event) => this.abreModalParaTweet(event, tweet._id)} />
                  })
                }
                <p hidden={this.state.tweets.length !== 0}>
                  Tweet algo!!
                </p>
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal fechaModal={this.fechaModal} isAberto={!!this.state.tweetAtivo._id}>
          <Widget>
            <Tweet key={this.state.tweetAtivo._id}
              removeHandler={(event) => this.removeTweet(this.state.tweetAtivo._id)}
              tweetInfo={this.state.tweetAtivo} conteudo={this.state.tweetAtivo.conteudo || ''}
              tweetInModal={true} />
          </Widget>
        </Modal>
      </Fragment >
    );
  }
}

export default Home;
