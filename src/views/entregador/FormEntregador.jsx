import axios from 'axios';
import InputMask from 'comigo-tech-react-input-mask';
import { useState } from 'react';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

import MenuSistema from '../../views/MenuSistema/MenuSistema';

export default function FormEntregador() {
    const [ativo, setAtivo] = useState('sim');
    const [uf, setUf] = useState();
    const [cidade, setCidade] = useState();
    const [bairro, setBairro] = useState();
    const [cep, setCep] = useState();
    const [numero, setNumero] = useState();
    const [rua, setRua] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [qtdEntregas, setQtdEntregas] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [rg, setRg] = useState();
    const [cpf, setCpf] = useState();
    const [nome, setNome] = useState();
    const [complemento, setComplemento] = useState();


    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregas,   // corrigido
            valorFrete: valorFrete,
            enderecoRua: rua,                      // corrigido
            enderecoComplemento: complemento,     // corrigido
            enderecoNumero: numero,                // corrigido
            enderecoBairro: bairro,                // corrigido
            enderecoCidade: cidade,                // corrigido
            enderecoCep: cep,                      // corrigido
            enderecoUf: uf,                        // corrigido
            ativo: ativo
        }




        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um entregador.')
            })

    }

    const options = [
        { key: 'AC', text: 'Acre', value: 'AC' },
        { key: 'AL', text: 'Alagoas', value: 'AL' },
        { key: 'AP', text: 'Amapá', value: 'AP' },
        { key: 'AM', text: 'Amazonas', value: 'AM' },
        { key: 'BA', text: 'Bahia', value: 'BA' },
        { key: 'CE', text: 'Ceará', value: 'CE' },
        { key: 'DF', text: 'Distrito Federal', value: 'DF' },
        { key: 'ES', text: 'Espírito Santo', value: 'ES' },
        { key: 'GO', text: 'Goiás', value: 'GO' },
        { key: 'MA', text: 'Maranhão', value: 'MA' },
        { key: 'MT', text: 'Mato Grosso', value: 'MT' },
        { key: 'MS', text: 'Mato Grosso do Sul', value: 'MS' },
        { key: 'MG', text: 'Minas Gerais', value: 'MG' },
        { key: 'PA', text: 'Pará', value: 'PA' },
        { key: 'PB', text: 'Paraíba', value: 'PB' },
        { key: 'PR', text: 'Paraná', value: 'PR' },
        { key: 'PE', text: 'Pernambuco', value: 'PE' },
        { key: 'PI', text: 'Piauí', value: 'PI' },
        { key: 'RJ', text: 'Rio de Janeiro', value: 'RJ' },
        { key: 'RN', text: 'Rio Grande do Norte', value: 'RN' },
        { key: 'RS', text: 'Rio Grande do Sul', value: 'RS' },
        { key: 'RO', text: 'Rondônia', value: 'RO' },
        { key: 'RR', text: 'Roraima', value: 'RR' },
        { key: 'SC', text: 'Santa Catarina', value: 'SC' },
        { key: 'SP', text: 'São Paulo', value: 'SP' },
        { key: 'SE', text: 'Sergipe', value: 'SE' },
        { key: 'TO', text: 'Tocantins', value: 'TO' }
    ]
    return (

        <div>
            <MenuSistema tela='entregador' />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group >

                                <Form.Input
                                    required
                                    fluid
                                    width={8}
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                    placeholder='Informe o nome do entregador'
                                />

                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    width={4}
                                    label='RG'
                                    maxLength="10"
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                    placeholder='Informe o RG do entregador'
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={5}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={5}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={5}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={5}
                                    value={qtdEntregas}
                                    onChange={e => setQtdEntregas(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={5}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                />

                            </Form.Group>
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    width={16}
                                    label='Rua'
                                    maxLength="10"
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                    placeholder='Informe o nome da rua'
                                />
                                <Form.Input
                                    width={4}
                                    fluid
                                    label='Numero'
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input
                                    width={9}
                                    fluid
                                    label='Bairro'
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}
                                />
                                <Form.Input
                                    width={9}
                                    fluid
                                    label='Cidade'
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                />
                                <Form.Input
                                    width={3}
                                    fluid
                                    label='CEP'
                                >
                                    <InputMask
                                        mask="99999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group widths='equal'>

                                <Form.Select
                                    fluid
                                    label='UF'
                                    options={options}
                                    placeholder='Selecione'
                                    value={uf}
                                    onChange={(e, { value }) => setUf(value)}

                                />


                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    value={complemento}
                                    onChange={e => setComplemento(e.target.value)}
                                    placeholder='Informe o complemento do endereço'
                                />
                            </Form.Group>
                            <Form.Group inline>
                                <label>Ativo</label>
                                <Form.Radio
                                    label='Sim'
                                    value='sim'
                                    checked={ativo === 'sim'}
                                    onChange={() => setAtivo('sim')}
                                />
                                <Form.Radio
                                    label='Não'
                                    value='não'
                                    checked={ativo === 'não'}
                                    onChange={() => setAtivo('não')}
                                />
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

