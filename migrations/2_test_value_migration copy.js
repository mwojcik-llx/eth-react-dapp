const Test = artifacts.require("TestContract");

module.exports = function (deployer) {
  deployer.deploy(Test);
};
