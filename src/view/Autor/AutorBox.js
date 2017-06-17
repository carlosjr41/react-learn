import React, { Component } from 'react';
import { TabAutores } from "./TabAutores";
import { FormAutor } from "./FormAutor";

export class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        fetch("https://cdc-react.herokuapp.com/api/autores")
            .then(res => res.json())
            .then(res => this.setState({ lista: res.slice(res.length - 5, res.length) }));
    }


    callbackAtualizaLista = (novaLista) => {
        this.setState({ lista: novaLista });
    }

    render() {
        return (
            <div className="content" id="content">
                <FormAutor callbackLista={this.callbackAtualizaLista} />
                <TabAutores lista={this.state.lista} />

            </div>
        );
    }
}