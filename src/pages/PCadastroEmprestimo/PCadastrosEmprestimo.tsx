import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import FormEmprestimo from "../../components/Formularios/Form Emprestimo/FormEmprestimo";
import Rodape from "../../components/Rodape/Rodape";

function PCadastroEmprestimo(): JSX.Element{
    return (
        <div className="pagina-grid">
            <Cabecalho />
            <FormEmprestimo />
            <Rodape />
        </div>
    );
}

export default PCadastroEmprestimo;