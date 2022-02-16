import { Address } from '../Address';

export class RegisterDoctorRequest {
  constructor(
    readonly title: string,
    readonly name: string,
    readonly firstName: string,
    readonly address: Address,
    readonly specialities: String[],
    readonly emails: String[],
    readonly billingId: string,
    readonly tel: string,
    readonly login: string,
    readonly onm: string
  ) {}
}
