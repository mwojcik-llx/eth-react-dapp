const Campaign = artifacts.require("Campaign");

module.exports = function (deployer) {
    deployer.deploy(Campaign, 'Sample Campaign 333');
};
