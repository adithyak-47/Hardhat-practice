const {ethers} = require('hardhat');
const fs = require('fs');
async function main(){

    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract with the address: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);

    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    console.log(`Token address: ${token.address}`);

    const data = {
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    };

    fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data));

}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});