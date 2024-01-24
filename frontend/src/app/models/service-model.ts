export class TimelineModel {
    id!: number;
    titre!: string;
    texte!: string[];
    image!: string;
    thematic!: string;
    dateStart!: Date;
    dateEnd!: Date;
}

export class ServiceModel {
    id!: number;
    name!: string;
    photo!: string;
    description!: string;
    thematics!: string[];
    timelines!: TimelineModel[];
}
