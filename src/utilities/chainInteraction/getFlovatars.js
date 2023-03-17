/**
 * Flovatar addresses
 * ****************************
 * Mainnet - 0x921ea449dffec68a
 * Testnet - 0x0cf264811b95d465
 */

const { query, config } = require("@onflow/fcl");

const api = "https://rest-mainnet.onflow.org";

config().put("accessNode.api", api);

const getFlovatars = async (address) => {
    const cadence = `
        import Flovatar from 0x921ea449dffec68a;

        pub struct Avatar {
            pub let id: UInt64;
            pub let isCreator: Bool;

            init(
                _ id: UInt64,
                _ isCreator: Bool
            ) {
                self.id = id;
                self.isCreator = isCreator;
            }
        }

        pub fun main(address: Address): [Avatar] {
            let flovatars = Flovatar.getFlovatars(address: address);
            let data : [Avatar] = [];
            
            for flovatar in flovatars {
                let isCreator = flovatar.metadata.creatorAddress == address;
                let avatar = Avatar(
                    flovatar.id,
                    isCreator
                );
                data.append(avatar);
            }

            return data;
        }
    `;
    const args = (arg, t) => [
        arg(address, t.Address)
    ]

    const flovatars = await query({ cadence, args });
    console.log(flovatars);
}

(async () => {
    const user = "0x2a0eccae942667be";
    await getFlovatars(user);
})();