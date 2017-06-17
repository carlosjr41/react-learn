import React, { Component } from 'react';
import InputText from "../../components/InputText";
import InputSubmit from "../../components/InputSubmit";
import PubSub from "pubsub-js";

export class FormAutor extends Component {
    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' }
    }

    enviaForm = (evento) => {
        evento.preventDefault();

        fetch("https://cdc-react.herokuapp.com/api/autores", {
            headers: { 'Content-type': "application/json" },
            method: "post",
            body: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha })
        })
            .then(response => response.json())
            .then(novaLista => PubSub.publish('nova-lista-autores',novaLista))
            .catch(error => console.log(error));
    }

    setNome = (evento) => {
        this.setState({ nome: evento.target.value });
    }

    setEmail = (evento) => {
        this.setState({ email: evento.target.value });
    }

    setSenha = (evento) => {
        this.setState({ senha: evento.target.value });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputText id="nome" type="text" name="nome" value={this.state.nome} label="Nome" onChange={this.setNome} />
                    <InputText id="email" type="email" name="email" value={this.state.email} label="E-mail" onChange={this.setEmail} />
                    <InputText id="senha" type="password" name="senha" value={this.state.senha} label="Senha" onChange={this.setSenha} />

                    <InputSubmit label="Gravar" />

                </form>

            </div>
        );

    }

}
