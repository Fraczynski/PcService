export interface Equipment {
   id: number;
   clientName: string;
   employeeName: string;
   name: string;
   status: string;
   problemDescription: string;
   requestDate: Date;
   releaseDate?: Date;
   invoiceId: string;
}
