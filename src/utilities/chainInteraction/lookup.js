// Import methods from FCL
const { query, config } = require("@onflow/fcl");

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
}

const resolveAddress = async (address) => {
    const cadence = `
        import FIND from 0x097bafa4e0b48eef

        pub fun main(address: Address): String? {
            return FIND.reverseLookup(address)
        }
    `;

    const args = (arg, t) => [
        arg(address, t.Address)
    ];
    
    const name = await query({ cadence, args });
    
    console.log(
        `${address} address is aliased to %c${name}`,
        "color: #36ad68; font-weight: bold"
    );
}

(async () => {
    console.clear();
    await resolveName('bjartek');
    await resolveAddress("0x886f3aeaf848c535");
})();