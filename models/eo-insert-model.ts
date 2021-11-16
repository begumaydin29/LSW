export class EoInsertModel {
    id: number;
    eoSwInsertId: number;
    eoNumber: string;
    oldPartNumber: string;
    newPartNumber: string;
    softwareLocationSWvalue: string;
    softwareLocationId: number;
    efStatus: string;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    isActive: number;
    eoCategory: string;
    eoStatus: string;
    airplaneId: number;
    airplaneIdList: number[] = [];
    eoEffectiveDate: Date;
    efEffectiveDate: Date;
    eoRevision: string;
    parentId: number;
    pnEo: string;
    softwareLocationSWvalueList: string[] = [];
    description: string;
}