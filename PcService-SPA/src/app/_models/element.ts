export interface Element {
   id?: number;
   equipmentId?: number;
   servicemanName: string;
   name: string;
   status: string;
   description: string;
   warrantyRepair?: boolean;
   partsCost?: number;
   serviceCost?: number;
   newWarrantyPeriod?: Date;
}
