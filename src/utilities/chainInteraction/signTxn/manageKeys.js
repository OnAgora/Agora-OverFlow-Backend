const { query, config, mutate, tx } = require("@onflow/fcl");
const { signer } = require("./signer");

config({
    "accessNode.api": "https://rest-testnet.onflow.org"
});

const addPublicKey = async (publicKey) => {
    const cadence = `
        transaction(publicKey: String, weight: UFix64) {
            prepare(signer: AuthAccount) {
                let bytes = publicKey.decodeHex();
                let key = PublicKey(
                    publicKey: bytes,
                    signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
                );

                var clampledWeight = weight;
                // 'weight' should be in range 0..1000.0
                if (weight > 1000.0) {
                    clampledWeight = 1000.0;
                }

                signer.keys.add(    
                    publicKey: key,
                    hashAlgorithm: HashAlgorithm.SHA3_256,
                    weight: clampledWeight
                )
            }
        }
    `;
    const weight = (0).toFixed(1);  // zero weight keys are perfectly fine for Proposer role
    const args = (arg, t) => [
        arg(publicKey, t.String),
        arg(weight, t.UFix64),
    ];

    const proposer = signer;
    const payer = signer;
    const authorizations = [signer];
    const limit = 1000;

    const txnId = await mutate({
        cadence,
        args,
        proposer,
        payer,
        authorizations,
        limit,
    });

    console.log(txnId);

    const txnDetails = await tx(txnId).onceSealed();

    return txnDetails;
};

const revokePublicKey = async (keyIndex) => {
    const cadence = `
        transaction(keyIndex: Int) {
            prepare(signer: AuthAccount) {
                signer.keys.revoke(
                    keyIndex: keyIndex,
                )
            }
        }
    `;
    const args = (arg, t) => [
        arg(keyIndex.toString(), t.Int),
    ];

    const proposer = signer;
    const payer = signer;
    const authorizations = [signer];
    const limit = 1000;

    const txnId = await mutate({
        cadence,
        args,
        proposer,
        payer,
        authorizations,
        limit,
    });

    console.log(txnId);
    const txnDetails = await tx(txnId).onceSealed();

    return txnDetails;
};

(async () => {
    const key = "790a6849decbc179e9904f7f601fbd629f1687f371484998ceb8c587303e05ae4f859c7aa91f8493642de1039039d2da9650b4b7d9d44d2486e7a2adabf602bc";
    // add public Key
    // const txnDetails = await addPublicKey(key);
    // console.log(txnDetails);

    // remove publickey
    const txnDetails = await revokePublicKey(26);
    console.log(txnDetails);
})();