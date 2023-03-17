const { query, config, arg } = require("@onflow/fcl");

const api = "https://rest-mainnet.onflow.org";

config().put("accessNode.api", api);

// Pass Path argument
const passPathArgument = async () => {
    const paths = {
        publicPath: {
            domain: "public",
            identifier: "flowTokenVault",
        },
        privatePath: {
            domain: "private",
            identifier: "flowTokenVault",
        },
        storagePath: {
            domain: "storage",
            identifier: "flowTokenVault",
        },
    }
    const cadence = `
        pub fun main(public: PublicPath, private: PrivatePath, storage: StoragePath): PrivatePath {
            return private;
        }
    `;
    const args = (arg, t) => [
        arg(paths.publicPath, t.Path),
        arg(paths.privatePath, t.Path),
        arg(paths.storagePath, t.Path),
    ];

    const result = await query({ cadence, args });
    console.log(result);
}

// Pass Optional Argument
const passOptionalArgument = async () => {
    const cadence = `
        pub fun main(a: Int?): Int? {
            return a;
        }
    `;
    const a = null;
    const args = (arg, t) => [
        arg(a, t.Optional(t.Int)),
    ];
    const result = await query({ cadence, args });
    console.log(result);
}

// Pass Multiple Arguments
const passMultipleOptionalArguments = async () => {
    const cadence = `
        pub fun main(a: String?, b: Bool?, c: UFix64?, d: Address?): Address? {
            return d;
        }
    `;
    const a = "hello";
    const b = null;
    const c = null;
    const d = "0x01";
    const args = (arg, t) => [
        arg(a, t.Optional(t.String)),
        arg(b, t.Optional(t.Bool)),
        arg(c, t.Optional(t.UFix64)),
        arg(d, t.Optional(t.Address)),
    ];
    const result = await query({ cadence, args });
    console.log(result);
}

// Pass Optional Array
const passOptionalArrayArgument = async () => {
    const cadence = `
        pub fun main(a: [Int?]): [Int?] {
            return a;
        }
    `;
    const a = ['3', '4', null, '5', '6'];
    const args = (arg, t) => [
        arg(a, t.Array(t.Optional(t.Int))),
    ];
    const result = await query({ cadence, args });
    console.log(result);
}

// Pass Array Optional
const passArrayOptionalArgument = async () => {
    const cadence = `
        pub fun main(a: [Int]?): [Int]? {
            return a;
        }
    `;
    // const a = ['3', '4', '5', '6'];
    const a = null;
    const args = (arg, t) => [
        arg(a, t.Optional(t.Array(t.Int))),
    ];
    const result = await query({ cadence, args });
    console.log(result);
}

// Pass Optional Dictionary
const passDictinaryOptionalArgument = async () => {
    const cadence = `
        pub fun main(a: {String: Int?}): Int?? {
            return a["amount"];
        }
    `;
    const a = [
        // {
        //     key: "amount",
        //     value: "34234",
        // },
        {
            key: "quality",
            value: "3",
        },
    ];
    const args = (arg, t) => [
        arg(a, t.Dictionary({ 
            key: t.String, 
            value: t.Optional(t.Int) 
        })),
    ];
    const result = await query({ cadence, args });
    console.log(result);
}

(async () => {
    await passPathArgument();
    await passOptionalArgument();
    await passMultipleOptionalArguments();
    await passOptionalArrayArgument();
    await passArrayOptionalArgument();
    await passDictinaryOptionalArgument();
})();