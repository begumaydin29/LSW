import { BaseDto } from '@shared/models/base-dto';

export class AuditLogDto extends BaseDto {
    swId: number;
    beforeSwPn: string;
    swPn: string;
    hwDescription: string;
    beforeHwDescription: string;
    beforeSwLocationValue: string;
    swLocationValue: string;
    beforeSwDescription: string;
    swDescription: string;
    beforeSwLocationDescription: string;
    swLocationDescription: string;
    beforeSwRemark: string;
    swRemark: string;
    swEoNumber: string;
    swEoRevision: string;
    beforeHwPn: string;
    hwPn: string;
    beforeHwErd: string;
    hwErd: string;
    beforeEoNumber: string;
    eoNumber: string;
    beforeEoStatus: string;
    eoStatus: string;
    tailNumber: string;
    beforeIsActive: number;
    isActive: number;
    auditTableName: string;
    auditAction: string;
    auditDate: Date | null;
    auditUserName: string;
}