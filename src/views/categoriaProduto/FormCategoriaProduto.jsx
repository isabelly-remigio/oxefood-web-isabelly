import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../views/MenuSistema/MenuSistema';




export default function FormCategoriaProduto () {

   
    const [descricao, setDescricao] = useState();
    const { state } = useLocation();
    const [idCategoriaProduto, setIdCategoriaProduto] = useState();

  useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/categoria-produto/" + state.id)
                .then((response) => {
                    setIdCategoriaProduto(response.data.id)
                    setDescricao(response.data.descricao)
                   
                })
        }
    }, [state])

    function salvar(){
        let categoriaProdutoRequest = {
            descricao: descricao


        }

        if (idCategoriaProduto != null){
            axios.put("http://localhost:8080/api/categoria-produto/" + idCategoriaProduto, categoriaProdutoRequest)
             .then((response) => { console.log('Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um Produto.') })
 } else { //Cadastro:
            axios.post("http://localhost:8080/api/categoria-produto", categoriaProdutoRequest)
                .then((response) => { console.log('Categoria de Produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a Categoria do Produto.') })
        }

        }
    

  return (

        <div>

            <MenuSistema tela='categoriaProduto' />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >
                    {idCategoriaProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Categoria Produto</h2>
                    }
                    {idCategoriaProduto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='descricao'
                                    maxLength="100"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}

                                />

                            

                            </Form.Group>


                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-categoriaProduto'}>

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
