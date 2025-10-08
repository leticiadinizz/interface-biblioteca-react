import { JSX } from "react"

function UpdateEmprestimo({ idEmprestimo }:  {idEmprestimo: number}): JSX.Element{
    return(
        <>
           <p>{idEmprestimo}</p> {/* SOMENTE PARA TESTE */}
        </>
    )
}

export default UpdateEmprestimo;