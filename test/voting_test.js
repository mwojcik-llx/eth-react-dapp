let Voting = artifacts.require('./Voting');

let contractInstance;
contract('Voting', (accounts) => {

    beforeEach(async () => {
        contractInstance = await Voting.new();
    });

    describe('after initialize', () => {

        it('should be initialized with empty campaigns array', async () => {
            let campaignCounter = await contractInstance.getCampaignCount();

            expect(campaignCounter.toNumber()).to.equal(0);
        });

        it('should throw error when try to get not existed campaign name', async () => {
            let throwsError = false;
            await contractInstance.getCampaignNameByIndex(3)
                .catch(() => {
                    throwsError = true;
                });
            expect(throwsError).to.equal(true);
        });

        it('should getCandidatesCountByCampaignId throw exception when campaign id not exists', async () => {
            let throwsError = false;
            await contractInstance.getCandidatesCountByCampaignId(0).catch(() => { throwsError = true });

            expect(throwsError).to.equal(true);
        });

        it('should addCandidateToCampaign throw exception when campaign index not exists', async () => {
            let throwsError = false;
            await contractInstance.addCandidateToCampaign(0, 'sample').catch(() => {throwsError = true});

            expect(throwsError).to.equal(true);
        });
    });

    describe('when method addCampaign is called', () => {
        it('should increse campaignsCounter to 1', async () => {
            const expectedCampaignName = 'sample';

            await contractInstance.addCampaign(expectedCampaignName);
            const campaignCounter = await contractInstance.getCampaignCount();
            expect(campaignCounter.toNumber()).to.equal(1);
        });

        it('should getCampaignNameByIndex return expcted campaign name', async () => {
            const expectedCampaignName = 'sample';

            await contractInstance.addCampaign(expectedCampaignName);
            const resultCampaignName = await contractInstance.getCampaignNameByIndex(0);
            expect(resultCampaignName).to.equal(expectedCampaignName);
        });

        describe('should be able to register campaign with name contains ...', () => {
            const execute = (expectedCampaignName) => {
                return contractInstance.addCampaign(expectedCampaignName)
                    .then(() => contractInstance.getCampaignCount())
                    .then(campaignCounter => {
                        expect(campaignCounter.toNumber()).to.equal(1);
                    });
            }

            it('space in name', async () => {
                await execute('sample campaign name');
            });

            it('capitalized name', async () => {
                await execute('Sample Campaign Name')
            });

            it('UPPERCASED name', async () => {
                await execute('SAMPLE CAMPAIGN NAME');
            });

            it('Special characters in name', () => {
                execute('$upp3r Ultr@ (@mp@!gn');
            });
        });

    });


    describe('when one campaign is created with no candidates', () => {
        const GIVEN_CAMPAIGN_INDEX = 0;
        beforeEach(async () => {
            await contractInstance.addCampaign('Example Campaign');
        });

        it('getCandidatesCountByCampaignId should return 0', async () => {
            const resultCount = await contractInstance.getCandidatesCountByCampaignId(GIVEN_CAMPAIGN_INDEX);
            expect(resultCount).to.equal(resultCount);
        });

    });
});