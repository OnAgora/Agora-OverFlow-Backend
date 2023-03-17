
const { query, config } = require("@onflow/fcl");

const api = "https://rest-testnet.onflow.org";
config().put("accessNode.api", api);

/** Fetch from testnet */
(async () => {
    console.clear();

    const cadence = `
        pub fun main() :Int {
            return 2001323;
        }
    `;

    const answer = await query({cadence});

    console.log(`Hello: Hey Testnet. the answer is: ${answer}`);
})();

/** Pass integer values as parameters */
(async () => {
    console.clear();

    const cadence = `
        pub fun main(a: Int, b: Int) :Int {
            return a + b;
        }
    `;

    const a = (5).toString();
    const b = (6).toString();
    const args = (arg, t) => [
        arg(a, t.Int),
        arg(b, t.Int)
    ]

    const answer = await query({cadence, args});

    console.log(`${a} + ${b} = ${answer}`);
})();

/** Pass multiple different types as parameters */
/**
 * Warning: Address must be in the format
 * (0x1 -> not working)
 * (0x01 -> working)
 */
(async () => {
    const cadence = `
        pub fun main(a: String, b: Bool, c: UFix64, d: Address): Address {
            return d;
        }
    `;

    const a = "Hello";
    const b = true;
    const c = "56.0";
    const d = "0x01";

    const args = (arg, t) => [
        arg(a, t.String),
        arg(b, t.Bool),
        arg(c, t.UFix64),
        arg(d, t.Address),
    ];

    const answer = await query({ cadence, args });

    console.log(answer);
})();

/** Pass Array as parameter */
(async () => {
    const cadence = `
        pub fun main(a: [String]) : String {
            if (a.length == 0) {
                return "No elements";
            }
            return a[a.length - 1];
        }
    `;

    const a = ["hello", "world"];
    const b = [];
    const argsA = (arg, t) => [
        arg(a, t.Array(t.String))
    ];
    const argsB = (arg, t) => [
        arg(b, t.Array(t.String))
    ];

    const answerA = await query({ cadence, args: argsA });
    console.log(answerA);

    const answerB = await query({ cadence, args: argsB });
    console.log(answerB);
;})();

/** Pass dictionary as parameter */
(async () => {
    const cadence = `
        pub fun main(a: {String: Int}): Int? {
            return a["amount"];
        }
    `;
    const a = [{
        key: "amount",
        value: '323',
    }];
    const args = (arg, t) => [
        arg(a, t.Dictionary({ key: t.String, value: t.Int })),
    ];

    const answer = await query({ cadence, args });
    console.log(answer);
})();

/** Returning custom data - struct */
(async () => {
    const cadence = `
        pub struct Custom {
            pub let number: Int;
            pub let address: Address;

            init(number: Int, address: Address) {
                self.number = number;
                self.address = address;
            }
        };

        pub fun main(): Custom {
            let t = Custom(number: 42, address: 0x3235);
            return t;
        }
    `;

    const custom = await query({cadence});
    const { number, address } = custom;
    console.log(`Number: ${number}, Address: ${address}`);
})();