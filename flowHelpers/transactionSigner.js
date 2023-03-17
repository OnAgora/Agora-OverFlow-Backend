const fcl = require("@onflow/fcl");
const { SHA3 } = require("sha3");

var EC = require('elliptic').ec;
const ec = new EC('p256');

const ADDRESS = "0x285ca2dc98ed5119";
const PRIVATE_KEY = "4ebb41b0577c04bb6dba2bef6b45bf7235e0eb056abf51eebc64a3d39efdef0c";
const KEY_ID = 0;

const sign = (message) => {
    const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"));
    const sig = key.sign(hash(message));
    const n = 32;
    const r = sig.r.toArrayLike(Buffer, "be", n);
    const s = sig.s.toArrayLike(Buffer, "be", n);
    return Buffer.concat([r, s]).toString("hex");
}

const hash = (message) => {
    const sha = new SHA3(256);
    sha.update(Buffer.from(message, "hex"));
    return sha.digest();
}

const authorizationFunction = async (account) => {
    // authorization function need to return an account
    return {
        ...account,
        tempId: `${ADDRESS}-${KEY_ID}`,
        addr: fcl.sansPrefix(ADDRESS),
        keyId: Number(KEY_ID),
        signingFunction: async signable => {
            // Singing functions are passed a signable and need to return a composite signature
            // signable.message is a hex string of what needs to be signed.
            return {
                addr: fcl.withPrefix(ADDRESS),
                keyId: Number(KEY_ID),
                signature: sign(signable.message),
            }
        }
    }
}

module.exports = {
    authorizationFunction
}