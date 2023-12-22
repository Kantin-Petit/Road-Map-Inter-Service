export class DataService {
    titre!: string; 
    texte!: string;
    image!: string;
    dateStart!: Date;
    dateEnd!: Date;
    color!: string;
}

export class Service {
    photo!: string;
    description!: string;
    data!: DataService[];
}