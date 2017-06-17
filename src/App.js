import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import InputText from "./components/InputText";
import InputSubmit from "./components/InputSubmit";

class App extends Component {

  constructor() {
    super();
    this.state = { lista: [], nome: '', email: '', senha: '' }
  }

  componentDidMount() {
    fetch("https://cdc-react.herokuapp.com/api/autores")
      .then(res => res.json())
      .then(res => this.setState({ lista: res.slice(res.length-5,res.length) }));
  }

  enviaForm = (evento) => {
    evento.preventDefault();

    fetch("https://cdc-react.herokuapp.com/api/autores", {
      headers: { 'Content-type': "application/json" },
      method: "post",
      body: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha })
    })
      .then(res => res.json())
      .then(res => this.setState({lista : res}))
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
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>


            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Home</h1>
          </div>

          <div className="content">

            <div id="main">
              <div className="header">
                <h1>Cadastro de Autores</h1>
              </div>
              <div className="content" id="content">
                <div className="pure-form pure-form-aligned">
                  <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputText id="nome" type="text" name="nome" value = {this.state.nome} label="Nome" onChange={this.setNome}/>
                    <InputText id="email" type="email" name="email" value = {this.state.email} label="E-mail" onChange={this.setEmail}/>
                    <InputText id="senha" type="password" name="senha" value = {this.state.senha} label="Senha" onChange={this.setSenha}/>
                    
                    <InputSubmit type="submit" className="pure-button pure-button-primary" label="Gravar"/>
                    
                  </form>

                </div>
                <div>
                  <table className="pure-table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>email</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        this.state.lista.map((autor) => {
                          return (
                            <tr key={autor.id}>
                              <td>{autor.nome}</td>
                              <td>{autor.email}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default App;
