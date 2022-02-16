import { Address } from '../Address';

export class RegisterPharmacyRequest {
  constructor(
    readonly name: string,
    readonly responsablesId: string[],
    readonly address: Address,
    readonly emails: String[],
    readonly userCredentialId: string,
    readonly billingId: string,
    readonly tel: string,
    readonly login: string
  ) {}
}
