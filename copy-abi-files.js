const fs = require('fs');

const requiredAbiFiles = ['Campaign', 'CampaignFactory'];
const inputPath = './build/contracts/';
const outputPath = './src/web3/';
const contractFileExtension = '.json'

function execute(contractName) {
    const fileContent = fs.readFileSync(`${inputPath}${contractName}${contractFileExtension}`, {encoding: 'utf-8'});
    if (!fileContent) {
        throw new Error(`Cannot find file with ${contractName} contract abi.`);
    }

    const json = JSON.parse(fileContent.toString());

    if (!json.hasOwnProperty('abi')) {
        throw new Error(`Cannot find abi property in file ${contractName} content.`);
    }

    fs.writeFileSync(
        `${outputPath}${contractName}${contractFileExtension}`,
        JSON.stringify(json.abi),
        {
            encoding: "utf-8",
            flag: 'w'
        }
    )

    console.log(`Contract: ${contractName} updated successfully.`);

}

requiredAbiFiles.forEach(contractName => {
    execute(contractName);
});
