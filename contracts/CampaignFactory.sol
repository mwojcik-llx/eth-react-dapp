pragma solidity >=0.4.22 <0.9.0;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] campaigns;
    mapping(string => bool) isCampaignExists;

    function createCampaign(string memory campaignName) public {
        require(campaignName != '' && !isCampaignExists[campaignName]);

        Campaign campaign = new Campaign(campaignName);
        campaigns.push(campaign);
        isCampaignExists[campaignName] = true;
    }

    function getCampaigns() external view returns (address[] memory, string[] memory, uint[] memory, bool[] memory){
        _addresses = new address[](campaigns.length);
        _names = new string[](campaigns.length);
        _voteCounters = new uint[](campaigns.length);
        _anyCandidates = new uint[](campaigns.length);

        for (uint i = 0; i < campaigns.length; i++) {
            _children[i] = campaigns[i];
            _names[i] = campaigns[i].getName();
            _voteCounters[i] = campaigns[i].getVoteCount();
            _anyCandidates[i] = campaigns[i].hasAtLeastOneCandidate();

        }
        return (_addresses, _names, _voteCounters, _anyCandidates);
    }

}
