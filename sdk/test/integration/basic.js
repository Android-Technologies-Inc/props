const sdk = require("../../dist")
const Neon = require("@cityofzion/neon-core")
const fs = require("fs")
var assert = require('assert');

describe("Basic System Test Suite", function() {
    this.timeout(60000);
    let puppet, network, options

    beforeEach( async function () {
        this.timeout(0);
        //initialize the contract puppet
        options = {
            node: "http://localhost:50012",
            scriptHash: "0xba7def4924881da2f85ee097ab7de171c6cb719a"
        }
        puppet = await new sdk.Puppet(options)
        await puppet.init()


        //load any wallets and network settings we may want later (helpful if we're local)
        network = JSON.parse(fs.readFileSync("../default.neo-express").toString());
        network.wallets.forEach( (walletObj) => {
            walletObj.wallet = new Neon.wallet.Account(walletObj.accounts[0]['private-key'])
        })
    })

    it ("should initialize the contract", async() => {
        const cozWallet = network.wallets[0].wallet
        const res = await puppet.deploy(cozWallet.address, false, cozWallet)
        console.log(res)
    })

    it("should get the token symbol", async () => {
        const symbol = await puppet.symbol()
        assert.equal(symbol, 'ISN')
    })

    it("should get the decimals", async () => {
        const decimals = await puppet.decimals()
        assert.equal(decimals, 0)
    })

    it("should get the total supply", async () => {
        const totalSupply = await puppet.totalSupply()
        const tokens = await puppet.tokens()
        assert.equal(totalSupply, tokens.length)
    })

    it("should get the balance of an account", async () => {
        const cozWallet = network.wallets[0].wallet
        const balance = await puppet.balanceOf(cozWallet.address)
        const tokensOf = await puppet.tokensOf(cozWallet.address)
        assert.equal(tokensOf.length, balance)
    })

    it("should mint a token to the root account", async function() {
        this.timeout(0)
        const cozWallet = network.wallets[0].wallet
        const tokensOld = await puppet.tokensOf(cozWallet.address)
        const res = await puppet.offlineMint(cozWallet)
        await sleep(2000)

        const client = new Neon.rpc.RPCClient(options.node)
        const tx = await client.getApplicationLog(res)
        console.log(tx)
        console.log('gas consumed: ', tx.executions[0].gasconsumed / 10 ** 8)
        const tokensNew = await puppet.tokensOf(cozWallet.address)
        assert(tokensNew.length === (tokensOld.length + 1))
    })

    it("should get the tokens of the root account", async() => {
        const cozWallet = network.wallets[0].wallet
        const res = await puppet.tokensOf(cozWallet.address, cozWallet)
        for (const tokenId of res) {
            const token = await puppet.properties(tokenId, cozWallet)
            assert(token)
        }
    })

    it("should get all the tokens on the contract", async() => {
        const res = await puppet.tokens()
        for (const tokenId of res) {
            const token = await puppet.properties(tokenId)
            assert(token)
        }
    })

    it("should get the owner of a token", async() => {
        const cozWallet = network.wallets[0].wallet
        let res = await puppet.tokensOf(cozWallet.address)
        const owner = await puppet.ownerOf(res[0])
        assert(cozWallet.address === owner.address)
    })

    it("should transfer a character to a user", async() => {
        const cozWallet = network.wallets[0].wallet
        const account = new Neon.wallet.Account('NUqoQhF9mVF7v6EeeU7YhpdSSr64cTJGD3')

        const initialTokensOfOwner = await puppet.tokensOf(cozWallet.address)
        await puppet.transfer(account.address, initialTokensOfOwner[0], cozWallet)

        await sleep(2000)

        const newTokensOfOwner = await puppet.tokensOf(cozWallet.address)
        const newTokensOfReceiver = await puppet.tokensOf(account.address)

        assert(newTokensOfOwner.indexOf(initialTokensOfOwner[0]) === -1)
        assert(newTokensOfReceiver.indexOf(initialTokensOfOwner[0]) !== -1)
    })

    it("should purchase a token", async() => {
        const cozWallet = network.wallets[0].wallet
        const initialTokensOf = await puppet.tokensOf(cozWallet.address)
        await puppet.purchase(cozWallet)
        await sleep(2000)
        const newTokensOf = await puppet.tokensOf(cozWallet.address)
        assert(initialTokensOf.length < newTokensOf.length)
    })

    it("should set the initial mint fee", async() => {
        const cozWallet = network.wallets[0].wallet
        const mintFee = 100000000
        await puppet.setMintFee(mintFee, cozWallet)
        await sleep(2000)
        const realizedMintFee = await puppet.getMintFee()
        assert.equal(mintFee, realizedMintFee)
    })

    it("should change the mint fee", async() => {

        const cozWallet = network.wallets[0].wallet
        const initialTokensOf = await puppet.tokensOf(cozWallet.address)
        const initialMintFee = await puppet.getMintFee()
        console.log('mint fee: ', initialMintFee)


        let res = await puppet.purchase(cozWallet)
        await sleep(2000)

        // verify that the token was purchased
        const newTokensOf = await puppet.tokensOf(cozWallet.address)
        console.log(initialTokensOf, newTokensOf)
        assert(initialTokensOf.length < newTokensOf.length)


        // update the mint fee to 10 GAS
        res = await puppet.setMintFee(5 * initialMintFee, cozWallet)
        console.log('set mint fee: ', res)
        await sleep(2000)

        // verify the update persisted
        const newMintFee = await puppet.getMintFee()
        console.log('new mint fee: ', newMintFee)
        assert.equal(newMintFee, initialMintFee * 5)

        // buy a new token and verify
        res = await puppet.purchase(cozWallet)
        await sleep(2000)

        const finalTokensOf = await puppet.tokensOf(cozWallet.address)
        assert(newTokensOf.length < finalTokensOf.length)

        // reset
        await puppet.setMintFee(initialMintFee, cozWallet)
    })


    it("should get the total epochs", async() => {
        const total = await puppet.totalEpochs()
        console.log(total)
    })

    it("should set the current epoch", async() => {
        const cozWallet = network.wallets[0].wallet
        await puppet.setCurrentEpoch(5, cozWallet)

        await sleep(2000)

        const currentEpoch = await puppet.getCurrentEpoch()

        assert.equal(currentEpoch, 5)
    })

    it("should create an epoch using a collection", async() => {
        const cozWallet = network.wallets[0].wallet


        options = {
            node: "http://localhost:50012",
            scriptHash: "0x863dbb9f115be11f3643077c8eb7e61c8bbe342b"
        }

        const collection = await new sdk.Collection(options)
        const collectionId = await collection.totalCollections()
        const initialCollection = await collection.getCollectionJSON(collectionId)


        const newEpoch = [
            {
            "drop_score": 1000,
            "unique": true,
            "traits": []
            },
            {
                "drop_score": 600,
                "unique": true,
                "traits": []
            }]

        initialCollection.values.forEach((value, i) => {
            if (i < 200) {
                newEpoch[i % 2].traits.push({
                    "collection_id": collectionId,
                    "index": i
                })
            }
        })

        const res = await puppet.createEpoch("testEpoch", 3, newEpoch, cozWallet)
        await sleep(2000)

        const client = new Neon.rpc.RPCClient(options.node)
        const tx = await client.getApplicationLog(res)
        console.log(tx)
        console.log('gas consumed: ', tx.executions[0].gasconsumed / 10 ** 8)

        const epoch_id = await puppet.totalEpochs()
        const res2 = await puppet.getEpochJSON(epoch_id)
        console.log(res2)
    })


    it("should create an epoch from a collection and sample from it", async() => {
        const cozWallet = network.wallets[0].wallet
        const client = new Neon.rpc.RPCClient(options.node)

        options = {
            node: "http://localhost:50012",
            scriptHash: "0x863dbb9f115be11f3643077c8eb7e61c8bbe342b"
        }

        const collection = await new sdk.Collection(options)
        const collectionId = await collection.totalCollections()
        const initialCollection = await collection.getCollectionJSON(collectionId)

        let newEpoch = []
        let traits = []
        let dropScore = 100
        initialCollection.values.forEach((value, i) => {
            traits.push({
                    "collection_id": collectionId,
                    "index": i
                }
            )
            if (traits.length > 10) {
                newEpoch.push({
                    "drop_score": dropScore,
                    "unique": false,
                    "traits": traits
                })
                dropScore += 100
                traits = []
            }
        })
        const maxTraits = 10

        console.log(newEpoch.length)
        //Create the Epoch
        console.log("create epoch: ")
        let res = await puppet.createEpoch("testEpoch", maxTraits, newEpoch, cozWallet)
        await sleep(2000)
        let tx = await client.getApplicationLog(res)
        console.log("Create Epoch: ", res, tx.executions[0].vmstate)
        console.log('gas consumed: ', tx.executions[0].gasconsumed / 10 ** 8)

        //Set the current Epoch
        console.log("set epoch: ")
        const epoch_id = await puppet.totalEpochs()
        res = await puppet.setCurrentEpoch(epoch_id, cozWallet)
        await sleep(2000)
        tx = await client.getApplicationLog(res)
        console.log("Set Epoch: ", res, tx.executions[0].vmstate)
        console.log('gas consumed: ', tx.executions[0].gasconsumed / 10 ** 8)

        //Pick some traits
        console.log("pick traits: ")
        res = await puppet.pickTraits(cozWallet)
        await sleep(2000)
        tx = await client.getApplicationLog(res)
        console.log("Pick Traits: ", res)
        if (tx.executions[0].vmstate ==='FAULT') {
            console.log(tx)
        }
        console.log('gas consumed: ', tx.executions[0].gasconsumed / 10 ** 8)

        tx.executions[0].notifications.forEach((n) => {
            console.log(n.state.value[0].value.map((entry) => {
                return sdk.helpers.formatter(entry)
            }))
        })
    })
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
