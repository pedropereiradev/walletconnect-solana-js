import {
  Web3Modal,
  createWeb3Modal,
  defaultSolanaConfig,
} from '@web3modal/solana';
import { PredicateAccount } from './utils/Predicate';
import { SolanaChains } from './helpers';
import {
  Provider,
  TransactionRequestLike,
  arrayify,
  hexlify,
  sha256,
  transactionRequestify,
} from 'fuels';
import { predicates as predicatesRelease } from './generated/predicate';
import { predicates as predicatesDebug } from './generated/predicate-debug';
import { predicatesWorking } from './generated/predicate-working';
import { VerificationPredicateAbi__factory } from './generated';
import base58 from 'bs58';

export class SolanaConnector {
  predicateAccount: PredicateAccount;
  modal: Web3Modal;
  solanaConfig;
  fuelProvider: Promise<Provider>;

  private projectId = import.meta.env.VITE_PROJECT_ID;

  private PROVIDER_URL = 'http://localhost:4000/v1/graphql';

  private chains = [
    SolanaChains.MAINNET,
    SolanaChains.TESTNET,
    SolanaChains.DEVNET,
  ];

  private encoder: TextEncoder;

  constructor() {
    // this.predicateAccount = new PredicateAccount({
    //   abi: VerificationPredicateAbi__factory.abi,
    //   bytecode: arrayify(VerificationPredicateAbi__factory.bin),
    // });
    this.predicateAccount = new PredicateAccount({
      // abi: predicatesWorking['verification-predicate'].abi,
      // bytecode: predicatesWorking['verification-predicate'].bytecode,
      // abi: predicatesRelease['verification-predicate'].abi,
      // bytecode: predicatesRelease['verification-predicate'].bytecode,
      abi: predicatesDebug['verification-predicate'].abi,
      bytecode: predicatesDebug['verification-predicate'].bytecode,
    });

    this.solanaConfig = defaultSolanaConfig({
      chains: this.chains,
      projectId: this.projectId,
      metadata: {
        name: 'Web3Modal',
        description: 'Web3Modal Laboratory',
        url: 'https://lab.web3modal.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      },
    });

    this.modal = createWeb3Modal({
      solanaConfig: this.solanaConfig,
      chains: this.chains,
      enableAnalytics: false,
      projectId: this.projectId,
    });

    this.fuelProvider = Provider.create(this.PROVIDER_URL);
    this.encoder = new TextEncoder();

    this.setupWatchers();
  }

  setupWatchers() {
    this.modal
      .getWalletProvider()
      ?.on('accountsChanged', async (pubKey: string) => {
        await this.accounts();
        await this.currentAccount();

        console.log('Switched to account:', pubKey);
      });
  }

  async createdPredicate(svmAddress: string) {
    const provider = await this.fuelProvider;

    const predicate = this.predicateAccount.createPredicate(
      provider,
      svmAddress
    );

    return predicate;
  }

  private svmAccounts(): Array<string> {
    const svmAddress = this.modal.getAddress();

    return svmAddress ? [svmAddress] : [];
  }

  async accounts(): Promise<Array<string>> {
    return this.predicateAccount.getPredicateAccounts(this.svmAccounts());
  }

  async isConnected(): Promise<boolean> {
    const accounts = await this.accounts();

    return accounts.length > 0;
  }

  async connect() {
    await this.modal.open();

    return this.isConnected();
  }

  async disconnect() {
    this.modal.disconnect();

    return !this.isConnected();
  }

  async sendTransaction(
    svmAddress: string,
    transaction: TransactionRequestLike
  ) {
    console.log({ svmAddress, transaction });

    const fuelProvider = await this.fuelProvider;
    const chainId = fuelProvider.getChainId();
    const account = this.predicateAccount.getPredicateAddress(svmAddress);

    console.log('>>> account', account);

    if (!account) {
      throw new Error(`No account found for ${svmAddress}`);
    }

    const transactionRequest = transactionRequestify(transaction);

    // Create a predicate and set the witness index to call in the predicate
    const predicate = await this.createdPredicate(svmAddress);

    predicate.connect(fuelProvider);

    // To each input of the request, attach the predicate and its data
    const requestWithPredicateAttached =
      predicate.populateTransactionPredicateData(transactionRequest);

    requestWithPredicateAttached.inputs.forEach((input) => {
      if ('predicate' in input && input.predicate) {
        input.witnessIndex = 0;
      }
    });

    const txId = requestWithPredicateAttached.getTransactionId(chainId);
    const u8TxId = this.encoder.encode(txId);

    // console.log({ txId, u8TxId });

    //@ts-ignore
    const signedMessage = await this.modal
      .getWalletProvider()
      //@ts-ignore
      ?.signMessage(u8TxId, 'utf8');
    // console.log({ signedMessage });

    const signature = hexlify(signedMessage);
    console.log({ signature, signedMessage });

    transactionRequest.witnesses.push(signature);

    await fuelProvider.estimatePredicates(transactionRequest);

    const response = await predicate.sendTransaction(transactionRequest);
    console.log(response);
    try {
      const result = await response.waitForResult();

      console.log({ result });

      console.log('Transaction sent');
      return result;
    } catch (error) {
      console.log(error);
      return { id: '' };
    }

    // return response;
  }

  async currentAccount(): Promise<string | null> {
    if (!(await this.isConnected())) {
      throw Error('No connected accounts');
    }

    const svmAccount = this.modal.getAddress();

    if (!svmAccount) {
      throw Error('No Solana account selected');
    }

    const currentAccount =
      this.predicateAccount.getPredicateAddress(svmAccount);

    return currentAccount;
  }
}
