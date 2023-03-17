const postmark = require("postmark");
//  Create Client:
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_API);

export default postmarkClient;