const VotingContract = artifacts.require("Voting");
const VotingLibrary = artifacts.require("VotingLib");

module.exports = function (deployer) {
  deployer.deploy(VotingLibrary);
  deployer.deploy(VotingContract);
  
  deployer.link(VotingLibrary, VotingContract);
};
