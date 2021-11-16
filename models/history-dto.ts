import { BaseDto } from '@shared/models/base-dto';

export class HistoryDto extends BaseDto {
    TailNumber: number;
    EquipmentKey: string;
    SwPn: string;
    SwPnDescription: string;
    BeforeSwPn: string;
    BeforeSwPnDescription: string;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
    TransactionType: string;
    EoNumber: string;
    EoRevision: string;
    Slid: string;
    ActivePassive: string;
}