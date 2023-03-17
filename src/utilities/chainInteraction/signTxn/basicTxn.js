const { config, query, mutate, tx, arg } = require("@onflow/fcl");
const { signer } = require("./signer");

/**
 * Basic example contract
 * https://flow-view-source.com/testnet/account/0xafabe20e55e9ceb6/contract/Basic
 */

// Contrary to our wallet signing example, we don't need most of it in our config now
// so we'll get back to simple version
config({
    "accessNode.api": "https://rest-testnet.onflow.org",
    "0xBasic": "0xafabe20e55e9ceb6"
});

const readCounter = async () => {
    const cadence = `
        import Basic from 0xBasic

        pub fun main(): UInt {
            return Basic.counter;
        }
    `;
    const counter = await query({ cadence });
    return counter;
}

const shiftCounter = async (value) => {
    console.log('Shifting the counter by', value);

    const cadence = `
        import Basic from 0xBasic;
        transaction(shift: UInt8) {
            prepare(acct: AuthAccount) {
                Basic.incrementCounterBy(shift);
            }
        }
    `;
    const args = (arg, t) => [ arg(value.toString(), t.UInt8) ];
    const proposer = signer;
    const payer = signer;
    const authorizations = [signer];

    const txnId = await mutate({
        cadence,
        args,
        proposer,
        payer,
        authorizations,
        limit: 999,
    });

    console.log(`submitting transaction ${txnId} to the network.`);
    console.log(`waiting for the transaction to be sealed...`);

    const label = 'Transaction sealing time';
    console.time(label);

    const txnDetails = await tx(txnId).onceSealed();
    console.timeEnd(label);

    return txnDetails;
}

(async () => {
    const prev = await readCounter();
    console.log(`before shifting: ${prev}`);

    const txn = await shiftCounter(10);
    console.log(txn);

    const after = await readCounter();
    console.log(`after shifting: ${after}`);
})();