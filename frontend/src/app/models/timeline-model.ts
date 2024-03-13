import { ServiceModel } from './service-model';

export class TimelineModel {
    id!: number;
    title!: string;
    text!: string;
    image?: any;
    date_start!: Date;
    date_end!: Date;
    service_id!: number;
    Service?: ServiceModel;
    Thematics!: {
        color: string;
        name: string;
        id: number;
    }[];

}

export class TimelineModelWithService extends ServiceModel {
    sujets!: TimelineModel[];
}
