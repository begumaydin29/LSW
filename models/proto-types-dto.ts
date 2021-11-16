import { Serializer } from "@shared/json/Serializer";
import { Injectable, Inject } from "@angular/core";
import { BaseDto } from "@shared/models/base-dto";
import { BaseSerializer } from "@shared/json/BaseSerializer";
import { AirplaneDto } from "./upload-sw-models/airplane-dto";
import { AtaDto } from "./upload-sw-models/ata-dto";
import { AuthorizedAirplaneConfigurationDto } from "./upload-sw-models/authorizedAirplaneConfiguration-dto";
import { DataLoadDto } from "./upload-sw-models/data-load-dto";
import { EquipmentDto } from "./upload-sw-models/equipment-dto";
import { EquipmentRefDto } from "./upload-sw-models/equipmentRef-dto";
import { LoadableSWDto } from "./upload-sw-models/loadableSW-dto";
import { SWLocationDto } from "./upload-sw-models/swLocation-dto";
import { AuthService } from "@shared/auth/auth.service";

export class ProtoTypesDto extends BaseDto {
    AirplaneList: AirplaneDto[] | undefined;
    AtaList: AtaDto[] | undefined;
    AuthorizedAirplaneConfigurationList:
        | AuthorizedAirplaneConfigurationDto[]
        | undefined;
    DataLoadList: DataLoadDto[] | undefined;
    EquipmentList: EquipmentDto[] | undefined;
    EquipmentRefList: EquipmentRefDto[] | undefined;
    LoadableSWList: LoadableSWDto[] | undefined;
    SWLocationList: SWLocationDto[] | undefined;
}

@Injectable({
    providedIn: "root"
})
export class ProtoTypesDtoSerializer extends BaseSerializer
    implements Serializer {

    currentUser: any;
    private authService: AuthService;
    constructor(@Inject(AuthService) authService: AuthService) {
        super();
        this.authService = authService;

        this.currentUser = this.authService.currentUser.profile;
    }




    fromJson(json: any): ProtoTypesDto {
        json = typeof json === "object" ? json : {};
        const protoTypesDto: ProtoTypesDto = new ProtoTypesDto();
        protoTypesDto.AirplaneList = [];
        protoTypesDto.AtaList = [];
        protoTypesDto.AuthorizedAirplaneConfigurationList = [];
        protoTypesDto.DataLoadList = [];
        protoTypesDto.EquipmentList = [];
        protoTypesDto.EquipmentRefList = [];
        protoTypesDto.LoadableSWList = [];
        protoTypesDto.SWLocationList = [];

        protoTypesDto.AuthorizedAirplaneConfigurationList = this.fromJsonAirplaneConfigList(json["$"]);
        protoTypesDto.AirplaneList = this.fromJsonAirplane(json);
        protoTypesDto.EquipmentList = this.fromJsonEquipment(json, protoTypesDto);
        protoTypesDto.SWLocationList = this.fromJsonSWLocationList(
            json,
            protoTypesDto
        );

        return protoTypesDto;
    }

    fromJsonAirplaneConfigList(json: any): AuthorizedAirplaneConfigurationDto[] {

        const airplaneConfigDtoList: AuthorizedAirplaneConfigurationDto[] = [];
        const airplaneConfigDto = new AuthorizedAirplaneConfigurationDto();

        airplaneConfigDto.date = json['Date'];
        airplaneConfigDto.name = json['Name'];
        airplaneConfigDto.schemaVersion = json['SchemaVersion'];
        airplaneConfigDto.time = json['Time'];

        if (this.isRealValue(this.currentUser)) {
            airplaneConfigDto.createdBy = this.currentUser.register_id;
        }

        airplaneConfigDtoList.push(airplaneConfigDto);

        return airplaneConfigDtoList;
    }

    fromJsonAirplane(json: any): AirplaneDto[] {

        const airplaneDtoList: AirplaneDto[] = [];
        const airplaneDto = new AirplaneDto();

        const jsonDollarObject = json["Airplane"][0]["$"];

        airplaneDto.airplane_Id = json.AirplaneId;

        airplaneDto.majorModel = jsonDollarObject["MajorModel"];
        airplaneDto.registrationNumber = jsonDollarObject["RegistrationNumber"];
        airplaneDto.tailNumber = jsonDollarObject["TailNumber"];



        if (this.isRealValue(this.currentUser)) {
            airplaneDto.createdBy = this.currentUser.register_id;
        }

        airplaneDtoList.push(airplaneDto);

        return airplaneDtoList;
    }

    fromJsonEquipment(json: any, protoTypesDto: ProtoTypesDto): EquipmentDto[] {
        const equipmentDtoList: EquipmentDto[] = [];
        const ataDtoList: AtaDto[] = [];

        let ata_Id = 1;

        const jsonEquipmentObject = json["Airplane"][0]["Equipment"];
        const jsonEquipmentObjectLength = json["Airplane"][0]["Equipment"].length;

        for (let eq = 0; eq < jsonEquipmentObjectLength; eq = eq + 1) {
            const equipmentDto = new EquipmentDto();

            equipmentDto.equipment_Id = eq + 1;
            equipmentDto.airplane_Id = json.AirplaneId;
            equipmentDto.key = jsonEquipmentObject[eq]["$"]["Key"];
            equipmentDto.name = jsonEquipmentObject[eq]["$"]["Name"];
            equipmentDto.partNumber = jsonEquipmentObject[eq]["$"]["PartNumber"];
            equipmentDto.referenceDesignator =
                jsonEquipmentObject[eq]["$"]["ReferenceDesignator"];
            equipmentDto.description = jsonEquipmentObject[eq]["$"]["Description"];

            if (this.isRealValue(this.currentUser)) {
                equipmentDto.createdBy = this.currentUser.register_id;
            }

            equipmentDtoList.push(equipmentDto);

            const jsonAtaObject = jsonEquipmentObject[eq]["ATA"];
            const jsonAtaObjectLength = jsonEquipmentObject[eq]["ATA"].length;

            for (let ata = 0; ata < jsonAtaObjectLength; ata = ata + 1) {
                const ataDto = new AtaDto();

                ataDto.ata_Id = ata_Id;
                ataDto.equipment_Id = eq + 1;
                ataDto.ataChapter = jsonAtaObject[ata]["$"]["ATAChapter"];
                ataDto.description = jsonAtaObject[ata]["$"]["Description"];
                if (this.isRealValue(this.currentUser)) {
                    ataDto.createdBy = this.currentUser.register_id;
                }
                ataDtoList.push(ataDto);

                ata_Id = ata_Id + 1;
            }

            protoTypesDto.AtaList = ataDtoList;
        }

        return equipmentDtoList;
    }

    fromJsonSWLocationList(
        json: any,
        protoTypesDto: ProtoTypesDto
    ): SWLocationDto[] {
        const swLocationDtoList: SWLocationDto[] = [];
        const loadableSwDtoList: LoadableSWDto[] = [];
        const dataLoadDtoList: DataLoadDto[] = [];
        const equipmentRefDtoList: EquipmentRefDto[] = [];

        let loadableSW_Id = 1;
        let dataLoad_Id = 1;
        let equipmentRef_Id = 1;

        const jsonSWLocationObject = json["Airplane"][0]["SWLocation"];
        const jsonSWLocationObjectLength = json["Airplane"][0]["SWLocation"].length;

        /* #SofwareLocation   */
        for (let sw = 0; sw < jsonSWLocationObjectLength; sw++) {
            const swLocationDto = new SWLocationDto();

            swLocationDto.swLocation_Id = sw + 1;
            swLocationDto.airplane_Id = json.AirplaneId;

            swLocationDto.description = jsonSWLocationObject[sw]["$"]["Description"];
            swLocationDto.type = jsonSWLocationObject[sw]["$"]["Type"];
            swLocationDto.value = jsonSWLocationObject[sw]["$"]["Value"];

            if (this.isRealValue(this.currentUser)) {
                swLocationDto.createdBy = this.currentUser.register_id;
            }
            swLocationDtoList.push(swLocationDto);

            const jsonLoadableSWObject = json["Airplane"][0]["SWLocation"][sw]["LoadableSW"];
            const jsonLoadableSWObjectLength =
                json["Airplane"][0]["SWLocation"][sw]["LoadableSW"].length;

            /* #LoadableSoftware   */
            for (let lsw = 0; lsw < jsonLoadableSWObjectLength; lsw++) {
                const loadableSWDto = new LoadableSWDto();

                loadableSWDto.loadableSW_Id = loadableSW_Id;
                loadableSWDto.swLocation_Id = sw + 1;
                loadableSWDto.description =
                    jsonLoadableSWObject[lsw]["$"]["Description"];
                loadableSWDto.partNumber = jsonLoadableSWObject[lsw]["$"]["PartNumber"];
                if (this.isRealValue(this.currentUser)) {
                    loadableSWDto.createdBy = this.currentUser.register_id;
                }
                loadableSwDtoList.push(loadableSWDto);

                /* #DataLoad   */
                const jsonDataLoadObject = json["Airplane"][0]["SWLocation"][sw]["LoadableSW"][lsw]["DataLoad"];
                let jsonDataLoadObjectLength = 0;

                if (jsonDataLoadObject !== undefined) {
                    jsonDataLoadObjectLength =
                        json["Airplane"][0]["SWLocation"][sw]["LoadableSW"][lsw]["DataLoad"].length;
                }

                for (let dload = 0; dload < jsonDataLoadObjectLength; dload++) {
                    const dataLoadDto = new DataLoadDto();

                    dataLoadDto.dataLoad_Id = dataLoad_Id;
                    dataLoadDto.loadableSW_Id = loadableSW_Id;
                    dataLoadDto.selection = jsonDataLoadObject[dload]["$"]["Selection"];

                    if (this.isRealValue(this.currentUser)) {
                        dataLoadDto.createdBy = this.currentUser.register_id;
                    }


                    dataLoadDtoList.push(dataLoadDto);

                    dataLoad_Id = dataLoad_Id + 1;
                }

                protoTypesDto.DataLoadList = dataLoadDtoList;

                /* #endDataLoad */

                /* #EquipmentRef   */
                const jsonEquipmentRefObject = jsonLoadableSWObject[lsw]["EquipmentRef"];
                let jsonEquipmentRefObjectLength = 0;

                if (jsonEquipmentRefObject !== undefined) {
                    jsonEquipmentRefObjectLength =
                        jsonLoadableSWObject[lsw]["EquipmentRef"].length;
                }

                for (let eref = 0; eref < jsonEquipmentRefObjectLength; eref++) {
                    const equipmentRefDto = new EquipmentRefDto();

                    equipmentRefDto.equipmentRef_Id = equipmentRef_Id;
                    equipmentRefDto.loadableSW_Id = loadableSW_Id;
                    equipmentRefDto.key = jsonEquipmentRefObject[eref]["$"]["Key"];

                    if (this.isRealValue(this.currentUser)) {
                        equipmentRefDto.createdBy = this.currentUser.register_id;
                    }

                    equipmentRefDtoList.push(equipmentRefDto);

                    equipmentRef_Id = equipmentRef_Id + 1;
                }
                /* #endEquipmentRef */

                loadableSW_Id = loadableSW_Id + 1;
            }
            /* #endLoadableSoftware */

            protoTypesDto.LoadableSWList = loadableSwDtoList;
            protoTypesDto.DataLoadList = dataLoadDtoList;
            protoTypesDto.EquipmentRefList = equipmentRefDtoList;

        }
        /* #endSoftwareLocation */

        return swLocationDtoList;
    }

    toJson(resource: ProtoTypesDto) {
        const data = {};

        data["AirplaneList"] = resource.AirplaneList;
        data["ATAList"] = resource.AtaList;
        data["AuthorizedAirplaneConfigurationList"] =
            resource.AuthorizedAirplaneConfigurationList;
        data["DataLoadList"] = resource.DataLoadList;
        data["EquipmentList"] = resource.EquipmentList;
        data["EquipmentRefList"] = resource.EquipmentRefList;
        data["LoadableSWList"] = resource.LoadableSWList;
        data["SWLocationList"] = resource.SWLocationList;

        return data;
    }

    airplane(airplaneDto: AirplaneDto) {
        const data = {};

        data["Airplane_Id"] = airplaneDto.airplane_Id;
        data["MajorModel"] = airplaneDto.majorModel;
        data["MinorModel"] = airplaneDto.minorModel;
        data["RegistrationNumber"] = airplaneDto.registrationNumber;
        data["TailNumber"] = airplaneDto.tailNumber;
        data["AuthorizedAirplaneConfiguration_Id"] =
            airplaneDto.authorizedAirplaneConfiguration_Id;
        data["CreatedBy"] = airplaneDto.createdBy;
        data["CreatedDate"] = airplaneDto.createdDate;
        data["ModifiedBy"] = airplaneDto.modifiedBy;
        data["ModifiedDate"] = airplaneDto.modifiedDate;
        data["IsActive"] = airplaneDto.isActive;

        return data;
    }

    ata(ataDto: AtaDto) {
        const data = {};

        data["ATA_Id"] = ataDto.ata_Id;
        data["ATAChapter"] = ataDto.ataChapter;
        data["Description"] = ataDto.description;
        data["Equipment_Id"] = ataDto.equipment_Id;
        data["CreatedBy"] = ataDto.createdBy;
        data["CreatedDate"] = ataDto.createdDate;
        data["ModifiedBy"] = ataDto.modifiedBy;
        data["ModifiedDate"] = ataDto.modifiedDate;
        data["IsActive"] = ataDto.isActive;

        return data;
    }

    authorizedAirplaneConfiguration(
        authorizedAirplaneConfigurationDto: AuthorizedAirplaneConfigurationDto
    ) {
        const data = {};

        data["Id"] = authorizedAirplaneConfigurationDto.id;
        data["Advice"] = authorizedAirplaneConfigurationDto.advice;
        data["Name"] = authorizedAirplaneConfigurationDto.name;
        data["SchemaVersion"] = authorizedAirplaneConfigurationDto.schemaVersion;
        data["Time"] = authorizedAirplaneConfigurationDto.time;
        data["Date"] = authorizedAirplaneConfigurationDto.date;
        data["CreatedBy"] = authorizedAirplaneConfigurationDto.createdBy;
        data["CreatedDate"] = authorizedAirplaneConfigurationDto.createdDate;
        data["ModifiedBy"] = authorizedAirplaneConfigurationDto.modifiedBy;
        data["ModifiedDate"] = authorizedAirplaneConfigurationDto.modifiedDate;
        data["IsActive"] = authorizedAirplaneConfigurationDto.isActive;

        return data;
    }

    dataLoad(dataLoadDto: DataLoadDto) {
        const data = {};

        data["DataLoad_Id"] = dataLoadDto.dataLoad_Id;
        data["Selection"] = dataLoadDto.selection;
        data["LoadableSW_Id"] = dataLoadDto.loadableSW_Id;
        data["SchemaVersion"] = dataLoadDto.schemaVersion;
        data["CreatedBy"] = dataLoadDto.createdBy;
        data["CreatedDate"] = dataLoadDto.createdDate;
        data["ModifiedBy"] = dataLoadDto.modifiedBy;
        data["ModifiedDate"] = dataLoadDto.modifiedDate;
        data["IsActive"] = dataLoadDto.isActive;

        return data;
    }

    equipment(equipmentDto: EquipmentDto) {
        const data = {};

        data["Equipment_Id"] = equipmentDto.equipment_Id;
        data["Key"] = equipmentDto.key;
        data["Type"] = equipmentDto.type;
        data["Name"] = equipmentDto.name;
        data["Description"] = equipmentDto.description;
        data["PartNumber"] = equipmentDto.partNumber;
        data["ReferenceDesignator"] = equipmentDto.referenceDesignator;
        data["Airplane_Id"] = equipmentDto.airplane_Id;
        data["CreatedBy"] = equipmentDto.createdBy;
        data["CreatedDate"] = equipmentDto.createdDate;
        data["ModifiedBy"] = equipmentDto.modifiedBy;
        data["ModifiedDate"] = equipmentDto.modifiedDate;
        data["IsActive"] = equipmentDto.isActive;

        return data;
    }

    equipmentRef(equipmentRefDto: EquipmentRefDto) {
        const data = {};

        data["EquipmentRef_Id"] = equipmentRefDto.equipmentRef_Id;
        data["Key"] = equipmentRefDto.key;
        data["LoadableSW_Id"] = equipmentRefDto.loadableSW_Id;
        data["CreatedBy"] = equipmentRefDto.createdBy;
        data["CreatedDate"] = equipmentRefDto.createdDate;
        data["ModifiedBy"] = equipmentRefDto.modifiedBy;
        data["ModifiedDate"] = equipmentRefDto.modifiedDate;
        data["IsActive"] = equipmentRefDto.isActive;

        return data;
    }

    loadableSW(loadableSWDto: LoadableSWDto) {
        const data = {};

        data["LoadableSW_Id"] = loadableSWDto.loadableSW_Id;
        data["PartNumber"] = loadableSWDto.partNumber;
        data["Name"] = loadableSWDto.name;
        data["Description"] = loadableSWDto.description;
        data["InterfaceVersionNumber"] = loadableSWDto.interfaceVersionNumber;
        data["InstalledAndActive"] = loadableSWDto.installedAndActive;
        data["Size"] = loadableSWDto.size;
        data["Type"] = loadableSWDto.type;
        data["SWLocation_Id"] = loadableSWDto.swLocation_Id;
        data["CreatedBy"] = loadableSWDto.createdBy;
        data["CreatedDate"] = loadableSWDto.createdDate;
        data["ModifiedBy"] = loadableSWDto.modifiedBy;
        data["ModifiedDate"] = loadableSWDto.modifiedDate;
        data["IsActive"] = loadableSWDto.isActive;
        data["EoRevision"] = loadableSWDto.eoRevision;
        data["EoNumber"] = loadableSWDto.eoNumber;
        data["ParentId"] = loadableSWDto.parentId;
        data["EfStatus"] = loadableSWDto.efStatus;
        data["EquipmentRefObj"] = loadableSWDto.equipmentRefObj;
        data["DataLoadObj"] = loadableSWDto.dataLoadObj;

        return data;
    }

    swLocation(sWLocationDto: SWLocationDto) {
        const data = {};

        data["SWLocation_Id"] = sWLocationDto.swLocation_Id;
        data["Description"] = sWLocationDto.description;
        data["HardwareType"] = sWLocationDto.hardwareType;
        data["Value"] = sWLocationDto.value;
        data["Type"] = sWLocationDto.type;
        data["Airplane_Id"] = sWLocationDto.airplane_Id;
        data["CreatedBy"] = sWLocationDto.createdBy;
        data["CreatedDate"] = sWLocationDto.createdDate;
        data["ModifiedBy"] = sWLocationDto.modifiedBy;
        data["ModifiedDate"] = sWLocationDto.modifiedDate;
        data["IsActive"] = sWLocationDto.isActive;
        data["loadableObj"] = sWLocationDto.loadableObj;

        return data;
    }


    private isRealValue(obj) {
        return obj && obj !== 'null' && obj !== 'undefined';
    }
}
