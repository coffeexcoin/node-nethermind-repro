import { WebSocketProvider, Interface } from "ethers";

const provider = new WebSocketProvider(process.env.WS_URL, "mainnet");
const iface = new Interface([
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
]);

const eventDefinition = iface.getEvent("Transfer");

const filter = {
    topics: [
        eventDefinition.topicHash,
        null,
        null,
        null
    ]
};

provider.on(filter, (log) => {
    const event = iface.decodeEventLog("Transfer", log.data, log.topics);
    console.log(event);
});