import { Address } from '../Address';

export class GetDoctorDetailsResponse {
  constructor(
    readonly title: string,
    readonly name: string,
    readonly firstName: string,
    readonly onm: string,
    readonly address: Address,
    readonly specialities: String[],
    readonly emails: String[],
    readonly tel: string
  ) {}
}
