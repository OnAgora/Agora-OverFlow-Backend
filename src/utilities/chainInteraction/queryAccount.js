// Import methods from FCL
const { query, config, account } = require("@onflow/fcl");

// Specify the API endpoint - this time we will use Mainnet
const api = "https://rest-mainnet.onflow.org";

// Configure FCL to use testnet as the access node
config().put("accessNode.api", api);

const resolveName = async (name) => {
    const cadence = `
        import FIND from 0x097bafa4e0b48eef

        pub fun main(name: String): Address? {
            return FIND.lookupAddress(name)
        }
    `;

    const args = (arg, t) => [
        arg(name, t.String)
    ];
    
    const address = await query({ cadence, args });
    
    console.log(
        `${name} identity has address %c${address}`,
        "color: #36ad68; font-weight: bold"
    );

    return address;
}

(async () => {
    const address = await resolveName('flovatar');
    if ( address ) {
        const accountInfo = await account(address);
        console.log(accountInfo);
    }
})();