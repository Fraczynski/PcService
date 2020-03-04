
export interface Repair {
   repairId: number;
   elementName: string;
   result: string;
   description?: string;
   warrantyRepair: boolean;
   warrantyExpiryDate?: Date;
}
