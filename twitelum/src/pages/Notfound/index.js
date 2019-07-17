import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './Notfound.css'

class Notfound extends Component {
    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Pagina nao encontrada!</h2>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default Notfound