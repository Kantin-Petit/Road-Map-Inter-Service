export class Timeline {
    id: number = 0;
    titre!: string; 
    texte!: string;
    image!: string;
    sujet!: string;
    dateStart!: Date;
    dateEnd!: Date;
}

export class Service {
    id: number = 0;
    photo!: string;
    description!: string;
    sujets!: string[];
    timelines!: Timeline[]; 
}
