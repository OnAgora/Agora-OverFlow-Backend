const { block, config } =  require("@onflow/fcl");

const api = "https://rest-mainnet.onflow.org";

config().put('accessNode.api', api);

(async () => {
    const latestBlock = await block({ sealed: true });
    console.log(`latest block: `, latestBlock);
    console.log("====================================");

    const previousBlock = await block({ height: latestBlock.height - 1 });
    console.log(`previous block:`, previousBlock);
    console.log("====================================");

    const blockById = await block({ id: previousBlock.parentId });
    console.log("blockById:", blockById);
    console.log("====================================");
})();