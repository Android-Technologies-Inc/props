echo "This should be run after NeoExpress is installed and is running, not before!"
# Install project dependencies
npm install
# Configure some NeoExpress parameters
neoxp policy set FeePerByte 100 genesis
neoxp policy set ExecFeeFactor 3 genesis
neoxp policy set StoragePrice 10000 genesis
neoxp transfer 10000 GAS genesis coz
# Deploy the smart contracts
npm run deploy
# Initialize the system
npm run initialize
# Mint some puppet s(test)
npm run mintPuppets