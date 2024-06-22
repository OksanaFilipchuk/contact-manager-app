import { ContactData } from './models/contact.model';

export const initData: ContactData[] = [
  {
    firstName: 'Oleg',
    lastName: 'Kovalenko',
    email: 'oleg@gmail.com',
    phone: '+38067-123-45-67',
    secondaryPhone: null,
    address: 'Shevshenka str, Lviv',
    birthday: '17.01.1978',
    additionalInfo: 'Manager at trade company',
  },
  {
    firstName: 'Iryna',
    lastName: 'Ostapenko',
    email: 'iryna@gmail.com',
    phone: '+38050-123-45-67',
    secondaryPhone: '+38050-123-45-68',
    address: 'Kopernika st,1 Ternopil',
    birthday: '27.07.1999',
    additionalInfo: 'Loyer',
  },
  {
    firstName: 'Orest',
    lastName: 'Kopostuk',
    email: 'orest@gmail.com',
    phone: '+38066-888-45-67',
    secondaryPhone: '+38050-888-45-68',
    address: 'Franka st,1 Kyiv',
    birthday: '02.03.2001',
    additionalInfo: 'Doctor at privat clinic',
  },
];
