export interface ContactData {
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string;
  secondaryPhone: string | null;
  address: string | null;
  birthday: string | null;
  additionalInfo: string | null;
}

export interface ContactDataToSave {
  id: number;
  data: ContactData;
}
