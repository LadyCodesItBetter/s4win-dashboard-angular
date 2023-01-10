import { ProductType } from "./product-type.enum";

export interface Attribute {
    attributeCode: string
    attributeDescription: string
    attributeLabel: string
    attributeName:string
    attributeType: number
    edited: boolean
}

export interface Transaction {
    _id: string,
    // TODO add enum
    bulkStatus: string,
    // TODO add enum
    productType: ProductType,
    deleted: boolean,
    reviewedByUser: number,
    createdByUser: number,
    attributes: Attribute[],
    // TODO add enum
    status: string,
    updatedAt: Date,
    createdAt: Date,
    edited: boolean,
    serialNumber: string,
    tagContent: string,
    tagSerialNumber: string,
    blockchainHash?: string,
    nftUcc?: string
}