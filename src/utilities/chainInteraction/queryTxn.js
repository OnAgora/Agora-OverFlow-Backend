// Similar to blocks, transactions also have different statuses:

// 1 - pending - transaction awaits for finalization
// 2 - finalized - transaction awaits execution
// 3- executed - transaction awaits sealing
// 4 - sealed - transaction is sealed and could be viewed as complete and irreversable
// 5 - expired - transaction expired

const { query, config, tx } = require("@onflow/fcl");
const api = "https://rest-mainnet.onflow.org";
config().put('accessNode.api', api);

(async () => {
    const id = "2297668a3f35d6c6b4a18bb9c5ea8d3e60ce7e4a4e0fe31ad5a9c623d002b9d7";
    const txResult = await tx(id).onceSealed();
    console.log(txResult);
})();