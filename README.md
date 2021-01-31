# Ethereum React dApp

This is project to present ability of usage Ethereum Blockchain with Smart Contracts.

Project contains fullstack app:
* Ethereum blockchain definition files - called in this docs `Truffle` files
* Ethereum client in React library - called in this docs `Frontend` files 
-----------------------------------------------------------------------------------------
## Project structure
In this project there are source files for:
### Truffle
* `contracts` - contains contracts and solidity liblaries definitions
* `migrations` - contains migration files for deploy `contracts`
* `test` - contains tests for `contracts`

### Frontend
* `public` - contains React public resources (index.html assets etc.)
* `src` - contains source files for client app 
-----------------------------------------------------------------------------------------
## Prerequisites
* Nodejs - LTS version
* Ganache (_optional_ but this is better option for development )
-----------------------------------------------------------------------------------------
## Avaliable scripts

### Truffle 
* `npm run truffle-compile` - compiles contracts and extract ABI files to `build` directory
* `npm run truffle-deploy` - deploys contract to blockchain (defined in  `truffle-config.js`)
* `npm run truffle-develop` - starts local development blockchain ( but preffer use `Ganache` app)

### Frontend
* `npm run fr-start` - runs application in development locally
* `npm run fr-build` - build application and move artifacts to `build` directory
* `npm run fr-test` - runs application's tests
-----------------------------------------------------------------------------------------

