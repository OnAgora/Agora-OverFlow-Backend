const { SHA3 } = require("sha3");

var EC = require('elliptic').ec;
const ec = new EC('p256');

const PRIVATE_KEY = "4ebb41b0577c04bb6dba2bef6b45bf7235e0eb056abf51eebc64a3d39efdef0c";

const sign = (message) => {
    const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, "hex"));
    const sig = key.sign(hash(message)); // hashMsgHex -> hash
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

module.exports = {
    sign
}