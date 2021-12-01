"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Puppet = void 0;
const lodash_1 = require("lodash");
const neon_core_1 = require("@cityofzion/neon-core");
const api_1 = require("./api");
const neon_js_1 = require("@cityofzion/neon-js");
const DEFAULT_OPTIONS = {
    node: 'http://localhost:50012',
    scriptHash: '0x3f57010287f648889d1ce5264d4fa7839fdab000'
};
class Puppet {
    constructor(options = {}) {
        this.networkMagic = -1;
        this.options = lodash_1.merge({}, DEFAULT_OPTIONS, options);
    }
    async init() {
        const getVersionRes = await this.node.getVersion();
        this.networkMagic = getVersionRes.protocol.network;
    }
    get node() {
        if (this.options.node) {
            return new neon_core_1.rpc.RPCClient(this.options.node);
        }
        throw new Error('no node selected!');
    }
    get scriptHash() {
        if (this.options.scriptHash) {
            return this.options.scriptHash;
        }
        throw new Error('node scripthash defined');
    }
    async balanceOf(address) {
        return api_1.PuppetAPI.balanceOf(this.node.url, this.networkMagic, this.scriptHash, address);
    }
    async decimals() {
        return api_1.PuppetAPI.decimals(this.node.url, this.networkMagic, this.scriptHash);
    }
    async deploy(data, upgrade, signer) {
        return api_1.PuppetAPI.deploy(this.node.url, this.networkMagic, this.scriptHash, data, upgrade, signer);
    }
    async getAttributeMod(attributeValue) {
        return api_1.PuppetAPI.getAttributeMod(this.node.url, this.networkMagic, this.scriptHash, attributeValue);
    }
    async getPuppetRaw(tokenId) {
        return api_1.PuppetAPI.getPuppetRaw(this.node.url, this.networkMagic, this.scriptHash, tokenId);
    }
    async ownerOf(tokenId) {
        return api_1.PuppetAPI.ownerOf(this.node.url, this.networkMagic, this.scriptHash, tokenId);
    }
    async offlineMint(signer) {
        return api_1.PuppetAPI.offlineMint(this.node.url, this.networkMagic, this.scriptHash, signer.address, signer);
    }
    async properties(tokenId) {
        return api_1.PuppetAPI.properties(this.node.url, this.networkMagic, this.scriptHash, tokenId);
    }
    async purchase(signer) {
        const method = "transfer";
        const GASScriptHash = "0xd2a4cff31913016155e38e474a2c06d08be276cf";
        const purchasePrice = await api_1.PuppetAPI.getMintFee(this.node.url, this.networkMagic, this.scriptHash);
        const params = [
            neon_js_1.sc.ContractParam.hash160(signer.address),
            neon_js_1.sc.ContractParam.hash160(this.scriptHash),
            neon_js_1.sc.ContractParam.integer(purchasePrice),
            neon_js_1.sc.ContractParam.any()
        ];
        try {
            const res = await api_1.NeoInterface.publishInvoke(this.node.url, this.networkMagic, GASScriptHash, method, params, signer);
            return res;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async setMintFee(fee, signer) {
        return api_1.PuppetAPI.setMintFee(this.node.url, this.networkMagic, this.scriptHash, fee, signer);
    }
    async symbol() {
        return api_1.PuppetAPI.symbol(this.node.url, this.networkMagic, this.scriptHash);
    }
    async getMintFee() {
        return api_1.PuppetAPI.getMintFee(this.node.url, this.networkMagic, this.scriptHash);
    }
    async tokens() {
        return api_1.PuppetAPI.tokens(this.node.url, this.networkMagic, this.scriptHash);
    }
    async tokensOf(address) {
        return api_1.PuppetAPI.tokensOf(this.node.url, this.networkMagic, this.scriptHash, address);
    }
    async transfer(to, tokenId, signer, data) {
        return api_1.PuppetAPI.transfer(this.node.url, this.networkMagic, this.scriptHash, to, tokenId, signer, data);
    }
    async totalSupply() {
        return api_1.PuppetAPI.totalSupply(this.node.url, this.networkMagic, this.scriptHash);
    }
    async update(script, manifest, signer) {
        return api_1.PuppetAPI.update(this.node.url, this.networkMagic, this.scriptHash, script, manifest, signer);
    }
    async totalEpochs() {
        return api_1.PuppetAPI.totalEpochs(this.node.url, this.networkMagic, this.scriptHash);
    }
    async setCurrentEpoch(epoch_id, signer) {
        return api_1.PuppetAPI.setCurrentEpoch(this.node.url, this.networkMagic, this.scriptHash, epoch_id, signer);
    }
    async getCurrentEpoch() {
        return api_1.PuppetAPI.getCurrentEpoch(this.node.url, this.networkMagic, this.scriptHash);
    }
    async createEpoch(label, maxTraits, traitLevels, signer) {
        return api_1.PuppetAPI.createEpoch(this.node.url, this.networkMagic, this.scriptHash, label, maxTraits, traitLevels, signer);
    }
    async getEpochJSON(epochId) {
        return api_1.PuppetAPI.getEpochJSON(this.node.url, this.networkMagic, this.scriptHash, epochId);
    }
    async pickTraits(signer) {
        return api_1.PuppetAPI.pickTraits(this.node.url, this.networkMagic, this.scriptHash, signer);
    }
}
exports.Puppet = Puppet;
//# sourceMappingURL=Puppet.js.map