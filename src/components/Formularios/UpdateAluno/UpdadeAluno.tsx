import { JSX, useEffect, useState } from "react";
import estilo from './UpdateAluno.module.css';
import AlunoRequests from "../../../fetch/AlunoRequests";

function UpdateAluno({ idAluno }: { idAluno: number }): JSX.Element {
    const [formData, setFormData] = useState({
        idAluno: idAluno,
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        endereco: '',
        email: '',
        celular: ''
    });

    // Busca as informações do aluno para preencher o formulário
    useEffect(() => {
        const fetchAlunos = async () => {   // função para fazer a consulta de alunos
            try {
                const aluno = await AlunoRequests.consultarAluno(formData.idAluno); // Requisição à API
                if (aluno) {
                    setFormData({
                        idAluno: formData.idAluno,
                        nome: aluno.nome || '',
                        sobrenome: aluno.sobrenome || '',
                        dataNascimento: aluno.dataNascimento
                            ? new Date(aluno.dataNascimento).toISOString().slice(0, 10)
                            : '',
                        endereco: aluno.endereco || '',
                        email: aluno.email || '',
                        celular: aluno.celular || ''
                    }); // Atualiza o estado com os dados
                }
            } catch (error) {
                console.error(`Erro ao buscar alunos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        };

        fetchAlunos();  // Executa a função de busca 
    }, []);

    // Função para atualizar o state
    const handleChange = (nome: string, valor: string) => {
        setFormData({ ...formData, [nome]: valor });
    };

    // função para recuperar dados do formulário e enviar para a requisição
    const handleSubmit = async (formData: { idAluno: number, nome: string; sobrenome: string; dataNascimento: string; endereco: string; email: string; celular: string; }) => {
        // Converte a data para enviar o formulário
        const formDataToSend = {
            ...formData,
            dataNascimento: formData.dataNascimento ? 
                new Date(formData.dataNascimento) : undefined
        }
        
        const resposta = await AlunoRequests.enviarFormularioAtualizacaoAluno(formDataToSend);
        if (resposta) {
            alert('Aluno atualizado com sucesso.');
        } else {
            alert('Erro ao atualizado aluno.');
        }
    }

    return (
        <section className={estilo['sec-form-aluno']}>
            <h1>Atualizar Aluno</h1>
            <form action="post" onSubmit={(e) => { e.preventDefault(); handleSubmit(formData); }}
                className={estilo['form-aluno']}
            >
                <div className={estilo['input-group']}>
                    <label htmlFor="">
                        Nome
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            value={formData.nome}
                            required
                            minLength={3}
                            onChange={(e) => handleChange("nome", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Sobrenome
                        <input
                            type="text"
                            name="sobrenome"
                            id="sobrenome"
                            value={formData.sobrenome}
                            required
                            minLength={3}
                            onChange={(e) => handleChange("sobrenome", e.target.value)}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label htmlFor="">
                        Data de Nascimento
                        <input
                            type="date"
                            name="dataNascimento"
                            id="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={(e) => handleChange("dataNascimento", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        Celular
                        <input
                            type="tel"
                            name="celular"
                            id="celular"
                            minLength={10}
                            maxLength={13}
                            value={formData.celular}
                            onChange={(e) => handleChange("celular", e.target.value)}
                        />
                    </label>
                </div>

                <div className={estilo['input-group']}>
                    <label htmlFor="">
                        Endereço
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            value={formData.endereco}
                            minLength={6}
                            onChange={(e) => handleChange("endereco", e.target.value)}
                        />
                    </label>

                    <label htmlFor="">
                        E-mail
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            minLength={11}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </label>
                </div>
                <input type="submit" value="ENVIAR" />
            </form>
        </section>
    );
}

export default UpdateAluno;