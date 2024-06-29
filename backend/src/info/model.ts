export interface Applicant {
    id: number;
    name: string;
    role: string;
    location: string;
    hobbies: string[];
    tag?: string;
}

export class ApplicantModel implements Applicant {
    constructor(
        public id: number,
        public name: string,
        public role: string,
        public location: string,
        public hobbies: string[],
        public tag?: string
    ) {}
}
