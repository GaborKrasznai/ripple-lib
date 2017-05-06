'use strict';
const RippleAPI = require('ripple-lib').RippleAPI; // require('ripple-lib')

const address = 'INSERT ADDRESS HERE'; // insert your ripple address
const secret = 'INSERT SECRET HERE'; // insert your secret key

const api = new RippleAPI({server: 'wss://s1.ripple.com:443'});
const instructions = {maxLedgerVersionOffset: 5};

const payment = {
  source: {
    address: address,
    maxAmount: {
      value: '0.01',
      currency: 'XRP'
    }
  },
  destination: {
    address: 'rKmBGxocj9Abgy25J51Mk1iqFzW9aVF9Tc',
    amount: {
      value: '0.01',
      currency: 'XRP'
    }
  }
};

function quit(message) {
  console.log(message);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

api.connect().then(() => {
  console.log('Connected...');
  return api.preparePayment(address, payment, instructions).then(prepared => {
    console.log('Payment transaction prepared...');
    const {signedTransaction} = api.sign(prepared.txJSON, secret);
    console.log('Payment transaction signed...');
    api.submit(signedTransaction).then(quit, fail);
  });
}).catch(fail);
