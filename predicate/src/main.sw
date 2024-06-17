/*
    - Import the necessary modules.
    - Define signature as ed25519 curve
    - handle with the signature to convert to b256 using sha256()
    - ? validate if the result is in b256 format and if this is valid
    - wallet addres should be in b256 or ed25519?
    - fuel Tx ID should be in b256 or ed25519? - b256
    - Validate if isOk()
    - if isOk() return true
        - else return false
*/
/*
    SEND TRANSACTION

    CONNECTOR
    - Criar uma transacao usando a fuel e o predicate
    - Pegar o id da transacao da fuel
    - Abre popup solana e solicita assinatura
    - Apos isso, tentar enviar transacao - .witnesses.push(signature)
    
    PREDICATE
    - Recuperar a assinatura da transacao tx_witness_data(index, talvez seja 0)
    - Recuperar o id da transacao da fuel - get_tx_id()
    - Recuperar o endereco usando o recover usando ed25519 curve
    - Comparar o endereco recuperado com o endereco do predicate
    - Se for igual, retornar true
    - Se nao, retornar false
*/predicate;

use std::{
    b512::B512,
    constants::ZERO_B256,
    ecr::{
        EcRecoverError,
        ed_verify,
    },
    tx::{
        tx_id,
        tx_witness_data,
    },
};

configurable {
    /// The Ethereum address that signed the transaction.
    SIGNER: b256 = ZERO_B256,
}

fn main() -> bool {
    // Retrieve the Solana signature from the witness data in the Tx at the specified index.
    let signature: B512 = tx_witness_data(0);

    // Attempt to recover the signer from the signature.
    let result = ed_verify(SIGNER, signature, tx_id());

    return true;
}
