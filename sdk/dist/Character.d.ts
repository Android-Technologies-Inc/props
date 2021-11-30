import { rpc, wallet } from '@cityofzion/neon-core';
export interface PuppetOptions {
    node?: string;
    scriptHash?: string;
}
export declare class Puppet {
    private options;
    private networkMagic;
    constructor(options?: PuppetOptions);
    init(): Promise<void>;
    get node(): rpc.RPCClient;
    get scriptHash(): string;
    balanceOf(address: string): Promise<number>;
    decimals(): Promise<number>;
    deploy(data: object, upgrade: boolean, signer: wallet.Account): Promise<any>;
    getAttributeMod(attributeValue: number): Promise<any>;
    getPuppetRaw(tokenId: string): Promise<string | undefined>;
    ownerOf(tokenId: number): Promise<wallet.Account | undefined>;
    mint(signer: wallet.Account): Promise<string | undefined>;
    properties(tokenId: number): Promise<any>;
    purchase(signer: wallet.Account): Promise<string | undefined>;
    rollDie(die: string): Promise<number>;
    rollDiceWithEntropy(die: string, precision: number, entropy: string): Promise<any>;
    rollInitialStat(): Promise<boolean>;
    rollInitialStateWithEntropy(entropy: string): Promise<any>;
    symbol(): Promise<string>;
    tokens(): Promise<number[]>;
    tokensOf(address: string): Promise<number[]>;
    transfer(to: string, tokenId: number, signer: wallet.Account, data: any): Promise<boolean | undefined>;
    totalSupply(): Promise<number>;
    update(script: string, manifest: string, signer: wallet.Account): Promise<boolean>;
}