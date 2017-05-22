const lbry = require('lbry-nodejs');
const fs = require('fs');

// lbry.claim_show("", {
//   "txid": "9a33cd5da9d3f21e1e9633b9222e4e79200996a3745e4521d976797118d4f357",
//   "nout": 0
// })
// .then((claim) => console.log(claim))
// .catch((e) => console.log(e))

let current_blockhash = "cdc64dbb3d13e599ddb767fb050eba73371380c6df89ac87045b5b25767100ab";
let next_blockhash_to_check;

lbry.block_show(current_blockhash)
.then((data) => {
  const block = data.result
  const transactions = block.tx
  var l = transactions.length
  for (var i = 0; i < l; i++) {
    let txid = transactions[i]
    claim_by_transaction_nout(txid, 0)
  }
})
.catch((e) => console.log(e))

const claim_by_transaction_nout = (txid, nout) => lbry.claim_show("", {
  "txid": txid,
  "nout": nout
})
.then((data) => {
  if (claim_data) {
    process_claim_data(data.result)
  } else {
    console.log("\n\nProcessed 1 transaction/nout combo but there was no claim associated.");
  }
})
.catch((e) => console.log(e))

const process_claim_data = (claim_data) => {
    // const claim = {
    //   name: claim_data.name,
    //   channel_name: claim_data.channel_name,
    //   claim_id: claim_data.claim_id,
    //   txid: claim_data.txid,
    //   nout: claim_data.nout,
    //   isFree: !Boolean(claim_data.value.stream.metadata.fee)
    // }
    // Object.assign(claim, claim_data.value.stream.metadata)
    //
    // if (claim.isFree) {
    //   console.log("\n\nThis is a free download");
    // } else {
    //   console.log("\n This costs", claim.fee.amount, claim.fee.currency);
    // }
    save_claim(claim_data);
    //do we want the rest, like height, has signature, etc?
}

const save_claim = (claim) => {
  const claim_string = JSON.stringify(claim)
  fs.appendFile('./data/claims.json', claim)
}
