import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormCliente() {

    return (

        <div>

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Produto </h2>

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
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={5}
                                    label='Codigo do Produto'
                                    placeholder='Informe o codigo do produto'>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    width={16}
                                    maxLength="100"
                                    placeholder='Informe a descrição do produto'>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Valor Unitário'
                                    placeholder='Informe o valor unitário do produto'

                                    >
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Tempo de Entrega Minimo em Minutos'
                                    placeholder='30'>

                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Tempo de Entrega Maximo em Minutos'
                                    placeholder='40'>
                                </Form.Input>

                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>

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

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
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
