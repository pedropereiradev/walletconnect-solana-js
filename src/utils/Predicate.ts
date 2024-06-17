import { arrayify } from '@ethersproject/bytes';
import {
  Address,
  type JsonAbi,
  Predicate,
  type Provider,
  getPredicateRoot,
  sha256,
  decodeBase58,
} from 'fuels';
import memoize from 'memoizee';
import type { PredicateConfig } from '../types';
import base58 from 'bs58';

export class PredicateAccount {
  private abi: JsonAbi;
  private bytecode: Uint8Array;
  private encoder: TextEncoder;

  constructor({ abi, bytecode }: PredicateConfig) {
    this.abi = abi;
    this.bytecode = bytecode;

    this.encoder = new TextEncoder();
  }

  getPredicateAddress = memoize((svmAddress: string): string => {
    const base58Address = decodeBase58(svmAddress).toBytes()

    const configurable = {
      // SIGNER: sha256(this.encoder.encode(svmAddress)),
      SIGNER: sha256(base58Address),
    };

    console.log('>>> svmAddress', svmAddress);
    console.log('>>> ENCODER', sha256(this.encoder.encode(svmAddress)));
    console.log('bs58', sha256(base58.decode(svmAddress)));

    console.log('>>> svmAddress', svmAddress);
    console.log('>>> configurable', configurable);

    // @ts-ignore
    const { predicateBytes } = Predicate.processPredicateData(
      this.bytecode,
      this.abi,
      configurable
    );
    const address = Address.fromB256(getPredicateRoot(predicateBytes));

    return address.toString();
  });

  createPredicate = memoize(
    (provider: Provider, svmAddress: string): Predicate<any> => {
      const address = decodeBase58(svmAddress).toBytes();

      const configurable = {
        SIGNER: address,
      };

      const predicate = new Predicate({
        bytecode: arrayify(this.bytecode),
        abi: this.abi,
        provider,
        configurableConstants: configurable,
      });

      console.log(predicate.address);

      return predicate;
    }
  );

  getSVMAddress(address: string, evmAccounts: Array<string> = []) {
    return evmAccounts.find(
      (account) => this.getPredicateAddress(account) === address
    );
  }

  getPredicateAccounts(svmAccounts: Array<string> = []): Array<string> {
    return svmAccounts.map((account) => this.getPredicateAddress(account));
  }
}
