import React, { Component } from 'react';
import { TabLivros } from "./TabLivros";
import { FormLivro } from "./FormLivro";
import PubSub from "pubsub-js";

export class LivroBox extends Component{
    constructor(){
        super();

        this.state = {livros: [], autores: []};
    }

    componentDidMount() {

         fetch("https://cdc-react.herokuapp.com/api/autores")
            .then(res => res.json())
            .then(res => {this.setState({ autores: res })});
            
        fetch("https://cdc-react.herokuapp.com/api/livros")
            .then(res => res.json())
            .then(res => this.setState({ livros: res }));

       

        PubSub.subscribe('nova-lista-livros', (topico, novaLista) => {
            this.setState({ livros: novaLista });
        });
    }

    render() {
        //<FormLivro />
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormLivro autores={this.state.autores}/>
                    <TabLivros livros={this.state.livros.slice(this.state.livros.length -5,this.state.livros.length )} />

                </div>
            </div>
        );
    }
}