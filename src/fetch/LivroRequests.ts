import { SERVER_CFG } from '../appConfig';
import LivroDTO from '../interfaces/LivroInterface';

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Livro
 */
class LivroRequests {

    private serverURL: string;            // Endereço do servidor
    private routeListaLivros: string;     // Rota de listagem de todos os livros
    private routeListaLivro: string;      // Rota de listagem de um livro específico
    private routeCadastraLivro: string;   // Rota de cadastro de livro
    private routeAtualizaLivro: string;   // Rota de atualização de livro
    private routeRemoveLivro: string;     // Rota de remoção de livro

    /**
     * Construtor define as rotas com base na configuração da API
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.routeListaLivros = SERVER_CFG.ENDPOINT_LISTAR_LIVROS;
        this.routeListaLivro = SERVER_CFG.ENDPOINT_LISTAR_LIVRO;
        this.routeCadastraLivro = SERVER_CFG.ENDPOINT_CADASTRAR_LIVRO;
        this.routeAtualizaLivro = SERVER_CFG.ENDPOINT_ATUALIZAR_LIVRO;
        this.routeRemoveLivro = SERVER_CFG.ENDPOINT_REMOVER_LIVRO;
    }

    /**
     * Busca a lista de livros cadastrados
     * @returns Retorna um array de livros ou null em caso de erro
     */
    async listarLivros(): Promise<LivroDTO[] | null> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaLivros}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeLivros: LivroDTO[] = await respostaAPI.json();
                return listaDeLivros;
            } else {
                throw new Error('Não foi possível listar os livros.');
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros: ${error}`);
            return null;
        }
    }

    /**
     * Consulta um livro específico pelo ID
     * @param idLivro Identificador do livro
     * @returns Dados do livro encontrado ou null
     */
    async consultarLivro(idLivro: number): Promise<LivroDTO | null> {
        const token = localStorage.getItem('token');

        try {
            console.log('Consultando livro...');
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaLivro}?idLivro=${idLivro}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const livro: LivroDTO = await respostaAPI.json();
                return livro;
            } else {
                throw new Error('Não foi possível consultar o livro.');
            }
        } catch (error) {
            console.error(`Erro ao consultar livro: ${error}`);
            return null;
        }
    }

    /**
     * Envia os dados do formulário para cadastrar um livro
     * @param formLivro Objeto com os dados do livro
     * @returns **true** se cadastrado com sucesso, **false** caso contrário
     */
    async enviaFormularioLivro(formLivro: string): Promise<boolean> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraLivro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: formLivro
            });

            if (!respostaAPI.ok) {
                throw new Error('Erro ao cadastrar o livro.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao enviar o formulário: ${error}`);
            return false;
        }
    }

    /**
     * Atualiza os dados de um livro existente
     * @param formLivro Objeto com os novos dados do livro
     * @returns **true** se atualizado com sucesso, **false** caso contrário
     */
    async enviarFormularioAtualizacaoLivro(formLivro: LivroDTO): Promise<boolean> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeAtualizaLivro}?idLivro=${formLivro.idLivro}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formLivro)
            });

            if (!respostaAPI.ok) {
                throw new Error('Erro ao atualizar o livro.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao atualizar o livro: ${error}`);
            return false;
        }
    }

    /**
     * Remove um livro existente
     * @param idLivro ID do livro a ser removido
     * @returns **true** se removido com sucesso, **false** caso contrário
     */
    async removerLivro(idLivro: number): Promise<boolean> {
        const token = localStorage.getItem('token');

        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemoveLivro}?idLivro=${idLivro}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!respostaAPI.ok) {
                throw new Error('Erro ao remover o livro.');
            }

            return true;
        } catch (error) {
            console.error(`Erro ao remover livro: ${error}`);
            return false;
        }
    }
}

// Exporta a classe já instanciada
export default new LivroRequests();
