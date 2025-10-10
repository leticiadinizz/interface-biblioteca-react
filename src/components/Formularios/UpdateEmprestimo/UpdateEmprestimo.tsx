import { JSX, useEffect, useState } from "react";
import estilo from './UpdateEmprestimo.module.css';
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import AlunoDTO from "../../../interfaces/AlunoInterface";
import LivroDTO from "../../../interfaces/LivroInterface";

interface FormData {
  idEmprestimo: number;
  idAluno: number;
  idLivro: number;
  dataEmprestimo: string;
  dataDevolucao: string;
  statusEmprestimo: string;
}

function UpdateEmprestimo({ idEmprestimo }: { idEmprestimo: number }): JSX.Element {
  const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
  const [livros, setLivros] = useState<LivroDTO[]>([]);
  const [formData, setFormData] = useState<FormData>({
    idEmprestimo,
    idAluno: 0,
    idLivro: 0,
    dataEmprestimo: new Date().toISOString().slice(0, 10),
    dataDevolucao: '',
    statusEmprestimo: ''
  });

  // Carrega alunos e livros para os selects
  useEffect(() => {
    const fetchAlunosLivros = async () => {
      try {
        const listaAlunos = await EmprestimoRequests.listarAlunos();
        const listaLivros = await EmprestimoRequests.listarLivros();
        setAlunos(listaAlunos);
        setLivros(listaLivros);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAlunosLivros();
  }, []);

  // Busca os dados do empréstimo para preencher o formulário
  useEffect(() => {
    const fetchEmprestimo = async () => {
      try {
        const emprestimo = await EmprestimoRequests.consultarEmprestimo(idEmprestimo);
        if (emprestimo) {
          setFormData({
            idEmprestimo,
            idAluno: emprestimo.idAluno,
            idLivro: emprestimo.idLivro,
            dataEmprestimo: emprestimo.dataEmprestimo
              ? new Date(emprestimo.dataEmprestimo).toISOString().slice(0, 10)
              : '',
            dataDevolucao: emprestimo.dataDevolucao
              ? new Date(emprestimo.dataDevolucao).toISOString().slice(0, 10)
              : '',
            statusEmprestimo: emprestimo.statusEmprestimo || ''
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmprestimo();
  }, [idEmprestimo]);

  const handleChange = (campo: keyof FormData, valor: string | number) => {
    setFormData({ ...formData, [campo]: valor });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const resposta = await EmprestimoRequests.atualizarEmprestimo(formData);
      if (resposta) {
        alert('Empréstimo atualizado com sucesso.');
      } else {
        alert('Erro ao atualizar empréstimo.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar empréstimo.');
    }
  };

  return (
    <section className={estilo['sec-form-emprestimo']}>
      <h1>Atualizar Empréstimo</h1>
      <form className={estilo['form-emprestimo']} onSubmit={handleSubmit}>
        <div className={estilo['input-group']}>
          <label>
            Aluno
            <select
              value={formData.idAluno}
              onChange={(e) => handleChange('idAluno', Number(e.target.value))}
              required
            >
              <option value={0}>Selecione</option>
              {alunos.map(a => (
                <option key={a.idAluno} value={a.idAluno}>{a.nome} {a.sobrenome}</option>
              ))}
            </select>
          </label>

          <label>
            Livro
            <select
              value={formData.idLivro}
              onChange={(e) => handleChange('idLivro', Number(e.target.value))}
              required
            >
              <option value={0}>Selecione</option>
              {livros.map(l => (
                <option key={l.idLivro} value={l.idLivro}>{l.titulo}</option>
              ))}
            </select>
          </label>
        </div>

        <div className={estilo['input-group']}>
          <label>
            Data do Empréstimo
            <input
              type="date"
              value={formData.dataEmprestimo}
              onChange={(e) => handleChange('dataEmprestimo', e.target.value)}
            />
          </label>
          <label>
            Data de Devolução
            <input
              type="date"
              value={formData.dataDevolucao}
              onChange={(e) => handleChange('dataDevolucao', e.target.value)}
            />
          </label>
        </div>

        <div className={estilo['input-group']}>
          <label>
            Status
            <select
              value={formData.statusEmprestimo}
              onChange={(e) => handleChange('statusEmprestimo', e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Pendente">Pendente</option>
              <option value="Devolvido">Devolvido</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </label>
        </div>

        <input type="submit" value="ATUALIZAR" />
      </form>
    </section>
  );
}

export default UpdateEmprestimo;
