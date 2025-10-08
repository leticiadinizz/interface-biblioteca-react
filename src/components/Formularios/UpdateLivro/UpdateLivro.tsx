import { JSX } from "react"

function UpdateLivro({ idLivro }:  {idLivro: number}): JSX.Element{
    return(
        <>
           <p>{idLivro}</p> {/* SOMENTE PARA TESTE */}
        </>
    )
}

export default UpdateLivro;