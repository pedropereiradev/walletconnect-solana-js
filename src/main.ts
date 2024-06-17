import './style.css';
import { SolanaConnector } from './Connector.ts';
import { createTransaction, seedAccount } from './utils/tx.ts';
import { ReceiptType, bn } from 'fuels';

const solanaConnector = new SolanaConnector();

const handleConnect = async (element: HTMLButtonElement) => {
  element.addEventListener('click', async () => {
    try {
      await solanaConnector.modal.open();
    } catch (error) {
      console.error(error);
    }
  });
};

const handleDisconnect = async (element: HTMLButtonElement) => {
  element.addEventListener('click', async () => {
    try {
      console.log({
        DISCONNECT_BEFORE: solanaConnector.modal.getAddress(),
        isConnected: true,
      });

      solanaConnector.modal.disconnect();
    } catch (error) {
      console.error(error);
    }
  });
};

const handleSignMessage = async (element: HTMLButtonElement) => {
  element.addEventListener('click', async () => {
    try {
      if (solanaConnector.modal.getAddress()) {
        console.log({
          ADDRESS: solanaConnector.modal.getAddress(),
          isConnected: true,
          PROVIDER_TYPE: solanaConnector.modal.getWalletProviderType(),
          PROVIDER: solanaConnector.modal.getWalletProvider(),
          TEST: await solanaConnector.modal.checkActiveProviders(),
          MODAL: solanaConnector.modal,
        });

        const predicate = await solanaConnector.createdPredicate(
          solanaConnector.modal.getAddress()!
        );

        await seedAccount(predicate.address, bn.parseUnits('0.01'), predicate.provider);
        console.log({ BALANCE: (await predicate.getBalance()).toString() });

        const transactionRequest = await createTransaction(predicate);

        const transaction = await solanaConnector.sendTransaction(
          solanaConnector.modal.getAddress()!,
          transactionRequest
        );

        // console.log(transaction);
        document.getElementById('signature')!.textContent =
          transaction.id ?? '';

        document.getElementById('signature-response')!.textContent =
          JSON.stringify(
            transaction,
            // transaction.receipts
            //   .filter((receipt) => receipt.type === ReceiptType.LogData)
            //   .map((receipt) => ({
            //     type: receipt.type,
            //     data: receipt.data,
            //   })),
            null,
            2
          );
        
        console.log(transaction.receipts.filter((receipt) => receipt.type === ReceiptType.LogData).map((receipt) => ({
          type: receipt.type,
          data: receipt.data,
        })));
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const handleGetAccounts = async (element: HTMLButtonElement) => {
  element.addEventListener('click', async () => {
    try {
      const accounts = await solanaConnector.accounts();
      console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  });
};

const handleCurrentAccount = async (element: HTMLButtonElement) => {
  element.addEventListener('click', async () => {
    try {
      const accounts = await solanaConnector.currentAccount();
      console.log(accounts);

      // console.log(
      //   solanaConnector.modal.getWalletProvider()._events.accountsChanged
      // );

    } catch (error) {
      console.error(error);
    }
  });
};

solanaConnector.modal
  .getWalletProvider()
  ?.on('accountsChanged', async (pubKey: string) => {
    // await solanaConnector.accounts();
    // await solanaConnector.currentAccount();

    console.log('Switched to account:', pubKey);

    document.getElementById('fuel-address')!.textContent = pubKey;
  });

// document.getElementById('fuel-address')!.textContent =
//   (await solanaConnector.currentAccount()) ?? '';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="app-content">
      <img src="./solanaLogoMark.png" alt="Solana"/>
      <h1 class="align-center">POC Walletconnect - Solana </h1>
      <div class="card">
        <button id="connect" type="button">Conectar</button>
        <button id="disconnect" type="button">Disconnect</button>
        <button id="sign-message" type="button">Sign Message</button>
        <button id="get-accounts" type="button">Get Accounts</button>
        <button id="current-account" type="button">Current Account</button>
      </div>
      <div>
        <p class='read-the-docs'><strong>Fuel Address:</strong> <span id="fuel-address"></span></p>
        <p class='read-the-docs'><strong>Signature:</strong> <span id="signature"></span></p>
      </div>
    </div>
    <div>
      <strong>Signature Response:</strong>
      <!-- ... -->
      <pre id="signature-response"></pre>
      <!-- ... -->
    </div>
  </div>
`;

handleConnect(document.querySelector<HTMLButtonElement>('#connect')!);
handleDisconnect(document.querySelector<HTMLButtonElement>('#disconnect')!);
handleSignMessage(document.querySelector<HTMLButtonElement>('#sign-message')!);
handleGetAccounts(document.querySelector<HTMLButtonElement>('#get-accounts')!);
handleCurrentAccount(
  document.querySelector<HTMLButtonElement>('#current-account')!
);
