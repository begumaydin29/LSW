
import { BaseDto } from '@shared/models/base-dto';

export class ListSoftwareDto extends BaseDto {
    Id: number | undefined;
    AcReg: string | undefined;
    Chapter: string | undefined;
    Erd: string | undefined;
    ErdDescription: string | undefined;
    SwPn: string | undefined;
    SwDescription: string | undefined;
    HwPn: string | undefined;
    HwDescription: string | undefined;
    SlId: string | undefined;
    SlDescription: string | undefined;
    EoNo: string | undefined;
    Status: string | undefined;
    Remarks: string | undefined;
    Ids: string | undefined;
    EqKey: string | undefined;
    SwPnEdited: number | undefined;
    SlIdEdited: number | undefined;
    EqKeyEdited: number | undefined;
}