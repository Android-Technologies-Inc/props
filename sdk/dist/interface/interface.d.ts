import { wallet } from "@cityofzion/neon-core";
export declare enum EventTypeEnum {
    CollectionPointer = 0
}
export interface BaseStats {
    charisma: number;
    constitution: number;
    dexterity: number;
    intelligence: number;
    strength: number;
    wisdom: number;
}
export interface PuppetType {
    armorClass: number;
    attributes: BaseStats;
    epoch: number;
    hitDie: string;
    name: string;
    owner: wallet.Account;
    traits: {};
    tokenId: number;
    tokenURI: string;
}
export interface CollectionType {
    id: number;
    author: wallet.Account;
    description: string;
    type: string;
    values: string[] | number[];
    extra: any;
    valuesRaw?: any[];
}
export interface EpochType {
    author: string;
    epochId: number;
    generatorInstanceId: number;
    mintFee: number;
    maxSupply: number;
    totalSupply: number;
}
export interface GeneratorType {
    id?: number;
    author?: string;
    label: string;
    baseGeneratorFee: number;
    traits: TraitType[];
}
export interface TraitType {
    label: string;
    slots: number;
    traitLevels: TraitLevel[];
}
export interface TraitLevel {
    dropScore: number;
    traits: EventTypeWrapper[];
}
export interface EventTypeWrapper {
    type: EventTypeEnum;
    maxMint: number;
    args: CollectionPointer;
}
export interface CollectionPointer {
    collectionId: number;
    index: number;
}
export interface PropConstructorOptions {
    node?: string;
    scriptHash?: string;
}
