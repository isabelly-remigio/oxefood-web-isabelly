import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../views/MenuSistema/MenuSistema';

export default function ListCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [enderecosCliente, setEnderecosCliente] = useState([]);
    const [openEnderecoModal, setOpenEnderecoModal] = useState(false);
    const [clienteIdAtual, setClienteIdAtual] = useState(null);
    const [idEnderecoRemover, setIdEnderecoRemover] = useState(null);
    const [openExclusaoEnderecoModal, setOpenExclusaoEnderecoModal] = useState(false);
    
    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/cliente/' + idRemover)
            .then((response) => {

                console.log('Cliente removido com sucesso.')

                axios.get("http://localhost:8080/api/cliente")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um cliente.')
            })
        setOpenModal(false)
    }

const visualizarEnderecos = async (clienteId) => {
    setClienteIdAtual(clienteId); 
    setOpenEnderecoModal(true);   
    try {
        const { data } = await axios.get(`http://localhost:8080/api/cliente/endereco/${clienteId}`);
        setEnderecosCliente(data);
    } catch (err) {
        console.error('Não foi possível carregar os endereços:', err);
        setEnderecosCliente([]); 
    }
};

const confirmarExclusaoEndereco = (idEndereco) => {
    setIdEnderecoRemover(idEndereco);
    setOpenExclusaoEnderecoModal(true);
};

const removerEndereco = async () => {
    if (!idEnderecoRemover) return; 
    try {
        await axios.delete(`http://localhost:8080/api/cliente/endereco/${idEnderecoRemover}`);
        const { data } = await axios.get(`http://localhost:8080/api/cliente/endereco/${clienteIdAtual}`);
        setEnderecosCliente(data);
    } catch (err) {
        console.error('Erro ao tentar remover o endereço:', err);
    } finally {
        setOpenExclusaoEnderecoModal(false); 
    }
};

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Cliente </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(cliente => (

                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>

                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={e => confirmaRemover(cliente.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Cadastrar novo endereço'
                                                icon
                                                as={Link}
                                                to="/form-endereco"
                                                state={{ clienteId: cliente.id }}
                                            >
                                                <Icon name='plus' />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='teal'
                                                title='Visualizar endereços'
                                                icon
                                                onClick={() => visualizarEnderecos(cliente.id)}
                                            >
                                                <Icon name='eye' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
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

            <Modal
                onClose={() => setOpenEnderecoModal(false)}
                open={openEnderecoModal}
                size='small'
                closeIcon
            >
                <Modal.Header>Endereços do Cliente</Modal.Header>
                <Modal.Content scrolling>
                    {enderecosCliente.length > 0 ? (
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                    <Table.HeaderCell>Bairro</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>Estado</Table.HeaderCell>
                                    <Table.HeaderCell>Complemento</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {enderecosCliente.map(enderecoCliente => (
                                    <Table.Row key={enderecoCliente.id}>
                                        <Table.Cell>{enderecoCliente.rua}</Table.Cell>
                                        <Table.Cell>{enderecoCliente.numero}</Table.Cell>
                                        <Table.Cell>{enderecoCliente.bairro}</Table.Cell>
                                        <Table.Cell>{enderecoCliente.cep}</Table.Cell>
                                        <Table.Cell>{enderecoCliente.cidade}</Table.Cell>
                                        <Table.Cell>{enderecoCliente.estado}</Table.Cell>
                                        <Table.Cell>{enderecoCliente.complemento}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                as={Link}
                                                to="/form-endereco"
                                                state={{
                                                    clienteId: clienteIdAtual,
                                                   enderecoClienteId: enderecoCliente.id,
                                                    enderecoClienteParaEditar: enderecoCliente
                                                }}
                                                inverted
                                                circular
                                                color='green'
                                                title='Editar endereço'
                                                icon
                                            >
                                                <Icon name='edit' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Remover endereço'
                                                icon
                                                onClick={() => confirmarExclusaoEndereco(enderecoCliente.id)}
                                                style={{ marginLeft: '5px' }}
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    ) : (
                        <p style={{ textAlign: 'center', color: 'grey' }}>Nenhum endereço cadastrado para este cliente.</p>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpenEnderecoModal(false)}>
                        Fechar
                    </Button>
                </Modal.Actions>
            </Modal>


            <Modal
                basic
                onClose={() => setOpenExclusaoEnderecoModal(false)}
                open={openExclusaoEnderecoModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover este endereço?</div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenExclusaoEnderecoModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={removerEndereco}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}
