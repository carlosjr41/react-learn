import React, { Component } from 'react';
import InputText from "../components/InputText";
import InputSubmit from "../components/InputSubmit";
import PubSub from "pubsub-js";

export class FormLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' }
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputText id="titulo" type="text" name="titulo" value={this.state.titulo} label="Titulo" onChange={this.setTitulo} />
                    <InputText id="preco" type="text" name="preco" value={this.state.preco} label="Preco" onChange={this.setPreco} />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select value={this.state.autorId} name="autorId" id="autorId" onChange={this.setAutorId}>
                            <option value="">Selecione o Autor</option>
                            {
                                this.props.autores.map((autor) => {
                                    return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>

                    <InputSubmit label="Gravar" />

                </form>

            </div>
        );

    }

    enviaForm = (evento) => {
        evento.preventDefault();

        fetch("https://cdc-react.herokuapp.com/api/livros", {
            headers: { 'Content-type': "application/json" },
            method: "post",
            body: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId })
        })
            .then(response => {
                let json = response.json();

                PubSub.publish("limpa-erros");

                if (response.ok)
                    return json;
                else {
                    return json.then(error => { throw error; });
                    //throw new Error(response.statusText);
                }

            })
            .then(novaLista => {
                this.limpaFormulario();
                PubSub.publish('nova-lista-livros', novaLista)
            })
            .catch(error => { PubSub.publish('erro-validacao', error.errors); });
    }

    setTitulo = (evento) => {
        this.setState({ titulo: evento.target.value });
    }

    setPreco = (evento) => {
        this.setState({ preco: evento.target.value });
    }

    setAutorId = (evento) => {
        this.setState({ autorId: evento.target.value });
    }

    limpaFormulario(){
        this.setState({ titulo: '', preco: '', autorId: '' });
    }
}