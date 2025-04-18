import web3 from "./web3";
import contractABI from "../contract/contractABI.json";

// 👉 Replace this with your actual deployed contract address
const contractAddress = "0x070f12736409E1846fe90C20c52889BfFeF1bd89";

const instance = new web3.eth.Contract(contractABI.abi, contractAddress);

export default instance;

