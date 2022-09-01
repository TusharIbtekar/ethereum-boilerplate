const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

// console.log(solc.compile(source, 1));

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)))

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
// console.log(module.exports);

exports.interface = output.contracts['Inbox.sol']['Inbox'].abi;
exports.bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

// console.log(output.contracts['Inbox.sol']['Inbox']);