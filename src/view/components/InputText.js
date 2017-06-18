import React, { Component } from 'react';
import PubSub from "pubsub-js";

export default class InputText extends Component {

    constructor() {
        super();
        this.state = { msgErro: "" };
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", (topico, erros) => {
            erros.forEach(erro => {
                if (this.props.name === erro.field) {
                    this.setState({ msgErro: erro.defaultMessage });
                }
            });
        });

        PubSub.subscribe("limpa-erros", (topico) => {
            this.setState({ msgErro: "" });
        });
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
                <span className="error">{this.state.msgErro}</span>
            </div>
        );
    }
}