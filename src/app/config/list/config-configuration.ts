export class Config{
    constructor(
        public templateId: number,
        public applictionId: number,
        public type: number,
        public viewStatus: boolean,
        public name: string,
        public configuration: string
    ) {  }
}