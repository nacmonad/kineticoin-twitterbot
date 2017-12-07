var config = require('./config');
var twitterConfig = config.twitterConfig();
var tokenContract = config.tokenContract();
var Twit = require('twit');
var web3 = config.web3();

var T = new Twit(twitterConfig);

// event subscriptions
var stream = T.stream('statuses/filter', { track: '#kineticoin' })
stream.on('tweet', function (tweet) {
  //adds user that tweeted #kineticoin related
  T.post('friendships/create', {user_id:tweet.user.id_str}, function(err, data, response) {
    if(err) throw err;
  })
})

tokenContract.events.TokensAdded({
    filter: {}, //{myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 3000000
}, function(error, event){ console.log(event); })
.on('data', function(event){
    console.log(event); // same results as the optional callback above
    try {
      console.log(web3.eth.accounts.recoverTransaction(event.signature));
    } catch (e) {

    }
    try {
      web3.eth.getTransaction('0xdab683866c5cbdc58c8de409e2e0cf3b5b01c437f18258cd8405a016c70c57cf', console.log)
    } catch (e) {

    }
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', console.error);

tokenContract.events.Transfer({
    filter: {}, //{myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 3000000
}, function(error, event){ console.log(event); })
.on('data', function(event){
    console.log(event); // same results as the optional callback above
    console.log(web3.eth.accounts.recoverTransaction(event.signature));
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', console.error);


console.log("Listening for smart contract and twitter events...");
