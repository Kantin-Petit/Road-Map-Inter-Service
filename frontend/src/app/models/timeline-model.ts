import { ServiceModel } from './service-model';

export class TimelineModel {
    id!: number;
    title!: string;
    text!: string;
    image!: string;
    date_start!: Date;
    date_end!: Date;
    serviceId!: number;
    Thematics!: {
        color: string;
        name: string;
        id: number;
    }[];
    
}

export class TimelineModelWithService extends ServiceModel { 
    sujets!: TimelineModel[];
}