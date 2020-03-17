export interface Equipment {
   id: number;
   clientId: number;
   name: string;
   status: string;
   problemDescription: string;
   requestDate: Date;
   releaseDate?: Date;
}
