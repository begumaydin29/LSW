import { AtaChapterDto } from "./ata-chapter-dto";
import { BaseDto } from "@shared/models/base-dto";

export class AddSLInsertDto extends BaseDto {
    id: number | undefined;
    airplaneIdList: number[] | undefined;
    swLocationValue: string | undefined;
    description: string | undefined;
    createdBy: string | undefined;
}