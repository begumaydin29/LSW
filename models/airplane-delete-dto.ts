
import { BaseDto } from '@shared/models/base-dto';

export class AirplaneDeleteDto extends BaseDto {
    TailNumber: string | undefined;
}