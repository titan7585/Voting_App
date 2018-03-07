web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x571212db622ef73d007dd82d2ed9e82e5465daf0');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteCandidate() {
  candidateName = $("#candidate").val();
  console.log("Candidate: ", candidateName);
  var vote = contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]});
  console.log("Vote: ", vote);
  var total = contractInstance.totalVotesFor(candidateName);
  console.log("Tot: ", total);
  var received = contractInstance.votesReceived(candidateName);
  console.log("Rec: ", received);
  /*contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    console.log("DIV: ", div_id);
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });*/
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});







/*const Web3 = require('web3');
//const solc = require('solc');
const fs = require('fs');
const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);


//const code = fs.readFileSync('./Voting.sol').toString();
//const compiledCode = solc.compile(code);
//console.log(compiledCode);
//const errors = [];
//const warnings = [];

if(compiledCode.errors){
  for(var i = 0; i < compiledCode.errors.length; i++){
    if (/\:\s*Warning\:/.test(compiledCode.errors[i])) {
        warnings.push(compiledCode.errors[i]);
      } else {
        errors.push(compiledCode.errors[i]);
      }
  }
}

if(errors.length > 0){
  throw new Error("Solidity compile error: ", error.join("\n"));
}


//const byteCode = compiledCode.contracts[':Voting'].bytecode;
abiDefinition = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
VotingContract = web3.eth.contract(abiDefinition);
contractInstance = VotingContract.at('0x571212db622ef73d007dd82d2ed9e82e5465daf0');
candidates = {"Sourav": "candidate-1", "Gagan": "candidate-2"};

//console.log(contractInstance);

function voteForCandidate() {
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
*/
