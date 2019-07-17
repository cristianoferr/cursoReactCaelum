import React, {Component,Fragment} from 'react';
import Cabecalho from './components/Cabecalho';
import './App.css';
import NavMenu from './components/NavMenu/NavMenu.js'
import Botao from './components/Botao/Botao.js'

function App() {
  return (
    <Fragment>
      <Cabecalho>
        <NavMenu usuario="@cristiano"/><Botao classe="danger">XUXA</Botao>
      </Cabecalho> 
    </Fragment>
  );
}
App.contextTypes = { store: React.PropTypes.object };

export default App;
