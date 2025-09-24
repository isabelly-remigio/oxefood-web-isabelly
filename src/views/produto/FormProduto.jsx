import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../views/MenuSistema/MenuSistema';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function FormProduto() {

    const [codigo, setCodigo] = useState();
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    function salvar() {
        let produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => {
                console.log('Produto cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um produto.')
            })
    }

    return (

        <div>
            <MenuSistema tela='produto' />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group >

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    width={13}
                                    maxLength="100"
                                    placeholder='Informe o titulo do produto'
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={5}
                                    label='Codigo do Produto'
                                    placeholder='Informe o codigo do produto'
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                >

                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.TextArea
                                    fluid
                                    label='Descrição'
                                    width={16}
                                    maxLength="100"
                                    placeholder='Informe a descrição do produto'
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Form.Group>


                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Valor Unitário'
                                    placeholder='Informe o valor unitário do produto'
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}

                                >
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Entrega Minimo'
                                    placeholder='30'>
                                    <InputMask
                                        mask="999"
                                        maskChar={null}
                                        placeholder="Ex: 30"
                                        value={tempoEntregaMinimo}
                                        onChange={e => setTempoEntregaMinimo(e.target.value)}
                                    />

                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Entrega Maximo '
                                    placeholder='40'>
                                    <InputMask
                                        mask="999"
                                        maskChar={null}
                                        placeholder="Ex: 40"
                                        value={tempoEntregaMaximo}
                                        onChange={e => setTempoEntregaMaximo(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-produto'}>

                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
