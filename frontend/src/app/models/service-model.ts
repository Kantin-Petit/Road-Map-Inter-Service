export class TimelineModel {
    id!: number;
    titre!: string; 
    texte!: string[];
    image!: string;
    sujet!: string;
    dateStart!: Date;
    dateEnd!: Date;
}

export class ServiceModel {
    id!: number;
    name!: string;
    photo!: string;
    description!: string;
    sujets!: string[];
    timelines!: TimelineModel[]; 
}
