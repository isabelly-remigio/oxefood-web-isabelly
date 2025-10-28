import { Route, Routes } from "react-router-dom";
import FormCategoriaProduto from './views/categoriaProduto/FormCategoriaProduto';
import ListCategoriaProduto from './views/categoriaProduto/ListCategoriaProduto';
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import FormCidade from './views/cidade/FormCidade';
import ListCidade from './views/cidade/ListCidade'
import FormEndereco from "./views/cliente/FormEndereco";
function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="list-cliente" element={<ListCliente />} />

                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="form-produto" element={<FormProduto />} />
                <Route path="list-produto" element={<ListProduto />} />
             <Route path="list-categoriaProduto" element={<ListCategoriaProduto />} />
                <Route path = "form-categoriaProduto" element={<FormCategoriaProduto/>} />

                <Route path="form-entregador" element={<FormEntregador />} />
                <Route path="list-entregador" element={<ListEntregador />} />
                <Route path="form-cidade" element= {<FormCidade/>}/>
                 <Route path="/list-cidade" element= {<ListCidade/>}/>
                 <Route path = "form-endereco" element ={<FormEndereco/>}/>
            </Routes>
        </>
    )
}

export default Rotas
