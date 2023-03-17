import * as fcl from "@onflow/fcl";
const t = require("@onflow/types");
const mintNFT = require("./flowHelpers/mintNFT")
import { serverAuthorization } from './flowHelpers/adminSigner';

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn")
//		.put("flow.network", "testnet");

const [user, setUser] = useState();

useEffect(() => {
  fcl.currentUser().subscribe(setUser);
}, [])

const logIn = () => {
  fcl.authenticate()
}

const stripeBuy = async () => {
  fetch('http://localhost:5005/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ]
    })
  }).then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  }).then(async ({ url }) => {
    console.log(url)


    window.location = url;
  }).catch(error => {
    console.error(error.error)
  })
  console.log('CHECKOUT')
}
//console.log(mintNFT)

const mintNFTx = async () => {
  console.log("Minting NFT");
  const transactionId = await fcl.mutate({
    cadence: mintNFT,
    args: (arg, t) => [
      arg("0", t.UInt64), // Will be the first argument `metadataId: UInt64`
      arg("0.1", t.UFix64), // Will be the second argument `price: UFix64`
      arg("1", t.UInt64), // Will be the third argument `_serial: UInt64`
    ],
    proposer: fcl.authz,
    payer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 999
  })
  //		const transaction = await fcl.tx(transactionId).onceSealed()
  console.log(transactionId) // The transactions status and events after being sealed
}