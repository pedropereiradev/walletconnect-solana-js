script;

use std::{
    b512::B512,
    constants::ZERO_B256,
    ecr::{
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

fn main(witness_index:u64) -> bool {
    // Retrieve the Solana signature from the witness data in the Tx at the specified index.
    let signature: B512 = tx_witness_data(0);
    let mockSigner = 0xd577b1c6eeca83aeff8097749dccfcdaec0fa367c71f95f0ab8479c302ca8b4e;
    let mockBsSigner = 0x48f2365cd5dda5f5c999ad6c8f5ebf035dcd569df87067211e06e5effe798c1d;

    log(mockBsSigner);
    log(signature);
    log(tx_id());

    // Attempt to recover the signer from the signature.
    let result = ed_verify(SIGNER, signature, tx_id()).unwrap();
    // let result = ed_verify(mockBsSigner, signature, tx_id());

    log(result);
    log(assert(result));
    // log(result.is_ok());
    // log(result.is_err());   

    // return result.is_ok();
    return result;
}
