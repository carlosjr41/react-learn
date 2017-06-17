import React, { Component } from 'react';
import { TabAutores } from "./TabAutores";
import { FormAutor } from "./FormAutor";
import PubSub from "pubsub-js";

export class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        fetch("https://cdc-react.herokuapp.com/api/autores")
            .then(res => res.json())
            .then(res => this.setState({ lista: res }));

        PubSub.subscribe('nova-lista-autores', (topico, novaLista) => {
            this.setState({ lista: novaLista });
        });
    }




    render() {
        return (
            <div className="content" id="content">
                <FormAutor />
                <TabAutores lista={this.state.lista.slice(this.state.lista.length -5,this.state.lista.length )} />

            </div>
        );
    }
}