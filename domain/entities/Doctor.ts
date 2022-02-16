import { Address } from './Address';

export class Doctor {
  id!: string;
  title?: string;
  name!: string;
  firstName!: string;
  onm!: string;
  address?: Address;
  specialities: String[];
  emails: String[];
  userCredentialId!: string;
  billingId: string;
  tel: string;
}
