import { Address } from 'cluster';

export class Pharmacy {
  id!: string;
  name: string;
  responsablesId: string[];
  address: Address;
  emails: String[];
  userCredentialId!: string;
  billingId: string;
  tel: string;
}
