import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, TableHeader, TableHeaderCell } from 'semantic-ui-react';
import MenuSistema from '../../views/MenuSistema/MenuSistema';

export default function ListProduto() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/categoria-produto")
            .then((response) => {
                setLista(response.data)
            })
    }


    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/categoria-produto/' + idRemover)
            .then((response) => {
                console.log('Produto removido com sucesso.')
                axios.get("http://localhost:8080/api/categoria-produto")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover uma Categoria de Produto.')
            })
        setOpenModal(false)
    }


    return (
        <div>
            <MenuSistema tela={'categoriaProduto'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>
                    <h2> Categoria Produto </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-categoriaProduto'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>
                            <TableHeader>
                                <Table.Row>
                                    <TableHeaderCell>Descrição</TableHeaderCell>
                                </Table.Row>
                            </TableHeader>

                            <Table.Body>
                                {lista.map(categoria_produto => (
                                    <Table.Row key={categoria_produto.id}>
                                        <Table.Cell>{categoria_produto.descricao}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados'
                                                icon
                                            >
                                                <Link
                                                    to='/form-categoriaProduto'
                                                    state={{ id: categoria_produto.id }}
                                                    style={{ color: 'green' }}
                                                >
                                                    <Icon name='edit' />
                                                </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este produto'
                                                icon
                                                onClick={() => confirmaRemover(categoria_produto.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>


                        </Table>
                    </div>
                </Container>
            </div >
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )

}