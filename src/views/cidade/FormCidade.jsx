import axios from 'axios';
import InputMask from 'comigo-tech-react-input-mask';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Divider, Form, FormGroup, Icon } from 'semantic-ui-react';
import MenuSistema from '../../views/MenuSistema/MenuSistema';


export default function FormProduto() {

    const [nome, setNome] = useState();

    const [qtdPopulacao, setQtdPopulacao] = useState();
    const [dataFundacao, setDataFundacao] = useState();
    const [ehCapital, setEhCapital] = useState(null); //bollean
    const { state } = useLocation();
    const [idCidade, setIdCidade] = useState();
    const [idEstado, setIdEstado] = useState();
    const [nomeEstado, setNomeEstado] = useState();
    const [siglaEstado, setSiglaEstado] = useState();

    //para data
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cidade/" + state.id)
                .then((response) => {
                    setIdCidade(response.data.id)
                    setNome(response.data.nome)
                    setEhCapital(response.data.ehCapital)
                    setDataFundacao(formatarData(response.data.dataFundacao))
                    setQtdPopulacao(response.data.qtdPopulacao)

                    setIdEstado(response.data.estado.nome)
                    setIdEstado(response.data.estado.sigla)

                })
        }
axios.get("http://localhost:8080/api/estado")
 .then((response) => {
 const dados = response.data.map(e => ({ text: e.nome, value: e.id }));
 setNomeEstado(dados);
 })

 axios.get("http://localhost:8080/api/estado")
 .then((response) => {
 const dados = response.data.map(e => ({ text: e.sigla, value: e.id }));
 setSiglaEstado(dados);
 })

    }, [state])

    function salvar() {
        let cidadeRequest = {
            nome: nome,
            idEstado: idEstado,
            ehCapital: ehCapital,
            dataFundacao: dataFundacao,
            qtdPopulacao: qtdPopulacao

        }

        if (idCidade != null) { //Alteração:
            axios.put("http://localhost:8080/api/cidade/" + idCidade, cidadeRequest)
                .then((response) => { console.log('Produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um cidade.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/cidade", cidadeRequest)
                .then((response) => { console.log('Produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o cidade.') })
        }

    }

    return (

        <div>
            <MenuSistema tela='cidade' />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >


                    {idCidade === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cidade &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCidade !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cidade &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    width={8}
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    placeholder='Informe o nome da Cidade'
                                />

                                <Form.Input
                                    fluid
                                    label='Data Fundação'
                                    width={5}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataFundacao}
                                        onChange={e => setDataFundacao(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                  <Form.Input
                                    required
                                    fluid
                                    width={8}
                                    label='Estado'
                                    maxLength="100"
                                    value={idEstado}
                                    onChange={ (e,{value}) => {
                                        setIdEstado(value)
                                    }}
                                    placeholder='Informe o nome da Cidade'
                                />

                                   <Form.Input
                                    required
                                    fluid
                                    width={8}
                                    label='Sigla'
                                    maxLength="100"
                                    value={idEstado}
                                    onChange={ (e,{value}) => {
                                        setIdEstado(value)
                                    }}
                                    placeholder='Informe o nome da Cidade'
                                />

                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    label='Qtd da População '
                                    placeholder='40'>
                                    <InputMask
                                        mask="999"
                                        maskChar={null}
                                        placeholder="Ex: 40"
                                        value={qtdPopulacao ? String(qtdPopulacao) : ''}
                                        onChange={e => setQtdPopulacao(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>
                            <br></br>
                            <FormGroup inline>
                                <label>É CAPITAL ?</label>
                                <Form.Radio
                                    label='Sim'
                                    value={true}
                                    checked={ehCapital === true}
                                    onChange={() => setEhCapital(true)}
                                />
                                <Form.Radio
                                    label='Não'
                                    value={false}
                                    checked={ehCapital === false}
                                    onChange={() => setEhCapital(false)}
                                />
                            </FormGroup>

                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-cidade'}>

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
