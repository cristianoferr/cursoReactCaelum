import React, {Component,Fragment} from 'react'

class Botao extends Component{
    render(){
        return (
            <Fragment>
                <button className="btn btn-{this.props.class}">
                    {this.props.children}
                </button>
            </Fragment>
        )
    }
}

export default Botao