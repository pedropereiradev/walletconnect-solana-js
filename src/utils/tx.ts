import {
  AbstractAddress,
  Address,
  BN,
  InputType,
  Predicate,
  Provider,
  ScriptTransactionRequest,
  Wallet,
  arrayify,
  bn,
  hexlify,
} from 'fuels';
import { VerificationScriptAbi__factory } from '../generated';
import { scripts } from '../generated/script-debug';

const PRIVATE_KEY = import.meta.env.VITE_GENESIS_PRIVATE_KEY || '';

export async function createTransaction(predicate: Predicate<any>) {
  try {
    const tx = new ScriptTransactionRequest({
      gasLimit: bn(100_000),
      maxFee: bn(100_000),
    });

    const provider = predicate.provider;

    const coins = await predicate.getResourcesToSpend([
      {
        amount: bn.parseUnits('0.001'),
        assetId: provider.getBaseAssetId(),
      },
    ]);

    tx.script = scripts['verification-script'].bytecode;
    // tx.script = arrayify(VerificationScriptAbi__factory.bin);

    tx.addResources(coins);

    tx.inputs?.forEach((input) => {
      if (
        input.type === InputType.Coin &&
        hexlify(input.owner) === predicate.address.toB256()
      ) {
        input.predicate = arrayify(predicate.bytes);
      }
    });

    tx.addCoinOutput(
      Address.fromString(
        'fuel1ymqt7mam6lvqfkmw5zpl2x4wa9074awfgv9pcfyfdzn6s66hr8zs8mn6ex'
      ),
      bn.parseUnits('0.00001'),
      provider.getBaseAssetId()
    );

    // console.log({
    //   estimatePrediates: await provider.estimatePredicates(tx),
    // });

    // const estimateTxGasAndFee = await provider.estimateTxGasAndFee({
    //   transactionRequest: tx,
    // });

    // console.log({
    //   maxFee: estimateTxGasAndFee.maxFee.toString(),
    //   minFee: estimateTxGasAndFee.minFee.toString(),
    //   maxGas: estimateTxGasAndFee.maxGas.toString(),
    //   minGas: estimateTxGasAndFee.minGas.toString(),
    //   gasLimit: estimateTxGasAndFee.gasLimit.toString(),
    //   gasPrice: estimateTxGasAndFee.gasPrice.toString(),
    // });

    return tx;
  } catch (e) {
    throw new Error(
      //@ts-ignore
      e?.response?.errors[0].message ?? e
    );
  }
}

export async function seedAccount(
  address: AbstractAddress,
  amount: BN,
  provider: Provider
) {
  try {
    console.log({ address, amount, provider });

    const genisesWallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    console.log({ genisesWallet: await genisesWallet.getBalance() });

    const resp = await genisesWallet.transfer(
      address,
      amount,
      provider.getBaseAssetId()
    );

    await resp.waitForResult();
  } catch (e) {
    throw new Error(
      //@ts-ignore
      e?.response?.errors[0].message ?? e
    );
  }
}
