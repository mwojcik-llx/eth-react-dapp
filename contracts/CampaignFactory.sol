pragma solidity >=0.4.22 <0.9.0;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] campaigns;
    mapping(string => bool) isCampaignExists;
    mapping(address => bool) isAddressExists;

    event CampaignCreated(address, string);

    function createCampaign(string memory campaignName) public {
        require(bytes(campaignName).length > 0 && !isCampaignExists[campaignName]);

        Campaign campaign = new Campaign(campaignName);
        campaigns.push(campaign);
        isCampaignExists[campaignName] = true;
        isAddressExists[address(campaign)] = true;
        emit CampaignCreated(address(campaign), campaignName);
    }

    function getCampaigns() public view returns (address[] memory, uint[] memory, bool[] memory, bool[] memory){
        address[] memory _addresses = new address[](campaigns.length);
        string [] memory _names = new string[](campaigns.length);
        uint[] memory _voteCounters = new uint[](campaigns.length);
        bool[] memory _anyCandidates = new bool[](campaigns.length);
        bool[] memory _canVote = new bool[](campaigns.length);

        for (uint i = 0; i < campaigns.length; i++) {
            _addresses[i] = address(campaigns[i]);
            _names[i] = campaigns[i].getName();
            _voteCounters[i] = campaigns[i].getVoteCount();
            _anyCandidates[i] = campaigns[i].hasAtLeastOneCandidate();
            _canVote[i] = campaigns[i].canUserVote();
        }
        //  TODO: add string[] with names to return values

        return (_addresses, _voteCounters, _anyCandidates, _canVote);
    }

    function getCampaignName(address campaignAddress) external view returns(string memory) {
        require(isAddressExists[campaignAddress]);
        return Campaign(campaignAddress).getName();
    }

}
