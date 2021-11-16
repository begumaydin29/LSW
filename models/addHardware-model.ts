import { AtaChapterDto } from "./ata-chapter-dto";

export class AddHardwareModel {
    name: string;
    description: string;
    partNumber: string;
    referenceDesignator: string;
    createdBy: string;
    ataDtoObj: AtaChapterDto[] = [];
    airplaneList: number[];
}