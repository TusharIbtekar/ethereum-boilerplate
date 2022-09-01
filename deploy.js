const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

require('dotenv').config()
const mnemonic = process.env.MNEMONIC;
const rinkebyAPI = process.env.API_ENDPOINT;

const provider = new HDWalletProvider(
  mnemonic,
  rinkebyAPI
);
const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode, arguments: ['Hi there'] })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();