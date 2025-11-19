import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./views/util/ProtectedRoute";
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
import FormLogin from './views/login/FormLogin';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormLogin />} />

                <Route path="/home" element={
// ProtectedRoute, ele foi usado encapsulando o nome da pagina com ProtectedRoute deixando a rota protegida
                    <ProtectedRoute>  
                        <Home />
                    </ProtectedRoute>
                } />


                <Route path="list-cliente" element={

                    <ProtectedRoute>
                        <ListCliente />
                    </ProtectedRoute>
                } />

                <Route path="form-cliente" element={
                    <ProtectedRoute>
                        <FormCliente />
                    </ProtectedRoute>

                } />
                <Route path="form-produto" element={
                    <ProtectedRoute>
                        <FormProduto />
                    </ProtectedRoute>

                } />
                <Route path="list-produto" element={
                    <ProtectedRoute>
                        <ListProduto />
                    </ProtectedRoute>
                } />
                <Route path="list-categoriaProduto" element={
                    <ProtectedRoute>
                        <ListCategoriaProduto />
                    </ProtectedRoute>
                } />
                <Route path="form-categoriaProduto" element={
                    <ProtectedRoute>
                        <FormCategoriaProduto />
                    </ProtectedRoute>

                } />

                <Route path="form-entregador" element={
                    <ProtectedRoute>
                        <FormEntregador />
                    </ProtectedRoute>
                } />
                <Route path="list-entregador" element={
                    <ProtectedRoute>
                        <ListEntregador />
                    </ProtectedRoute>
                } />
                <Route path="form-cidade" element={
                    <ProtectedRoute>
                        <FormCidade />
                    </ProtectedRoute>
                } />
                <Route path="/list-cidade" element={
                    <ProtectedRoute>
                        <ListCidade />
                    </ProtectedRoute>
                } />
                <Route path="form-endereco" element={
                    <ProtectedRoute>
                        <FormEndereco />
                    </ProtectedRoute>

                } />
            </Routes>
        </>
    )
}

export default Rotas
