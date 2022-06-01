const ecies = require("eth-ecies");
const EthUtil = require("ethereumjs-util");
const EthereumTx = require("ethereumjs-tx").Transaction;
const stripHexPrefix = require("strip-hex-prefix");

const SIGNEDTX =
  "0xSIGNEDTX51caf4ad000830eec9a94ef9dc3c39ca40a2a3000acc5ca0467ce1c25080880b9020422499a65000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000030aad48f5ea5e8b2277612eb2a375fc173bb049e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000024c58125bc00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d62566935347371564a46457272767a667466717962694279637235665352475078417a4d48544c433573734a00000000000000000000000000000000000026a006765d340139f79d30358995476960638038ccbce921a00fcea13da347329d86a04637b4e60192a188dd6cc1069db7340b9d7c3d765860990247172b6624d68c1e";
const PRIVATE_KEY = "0xRECEIVER_PRIVATE_KEY";

// Create a tx object from signed tx
const tx = new EthereumTx(SIGNEDTX);

// Get an address of sender
const address = EthUtil.bufferToHex(tx.getSenderAddress());
console.log(address);

// get a public key of sender
const publicKey = EthUtil.bufferToHex(tx.getSenderPublicKey());
console.log(publicKey);

let plaintext = new Buffer(
  `HEy shay, i hacked the project.. please send me 10 eth ..here is my addres...`
);
let encryptedMsg = ecies.encrypt(
  Buffer.from(stripHexPrefix(publicKey), "hex"),
  plaintext
);
console.log(encryptedMsg);
let plaintextDecrypted = ecies.decrypt(
  Buffer.from(PRIVATE_KEY, "hex"),
  encryptedMsg
);
console.log("plaintextDecrypted", plaintextDecrypted.toString());
