export class Timeline {
    id!: number;
    titre!: string; 
    texte!: string;
    image!: string;
    sujet!: string;
    dateStart!: Date;
    dateEnd!: Date;
}

export class Service {
    id!: number;
    photo!: string;
    description!: string;
    sujets!: string[];
    timelines!: Timeline[]; 
}
