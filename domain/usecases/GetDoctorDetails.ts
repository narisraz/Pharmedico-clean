import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from '../entities/Doctor';
import { ErrorEntity } from '../entities/errors/ErrorEntity';
import { GetDoctorDetailsRequest } from '../entities/request/GetDoctorDetailsRequest';
import { GetDoctorDetailsResponse } from '../entities/response/GetDoctorDetailsResponse';
import { GetDoctorDetailsInputBoundary } from '../ports/in/GetDoctorDetailsInputBoundary';
import { DoctorRepository } from '../ports/out/DoctorRepository';

export class GetDoctorDetails implements GetDoctorDetailsInputBoundary {
  constructor(private doctorRepository: DoctorRepository) {}

  execute(
    input: GetDoctorDetailsRequest
  ): Observable<GetDoctorDetailsResponse | ErrorEntity> {
    return this.doctorRepository.get(input.id).pipe(map(this.buildResponse));
  }

  buildResponse(
    doctor: Doctor | undefined
  ): GetDoctorDetailsResponse | ErrorEntity {
    return doctor
      ? new GetDoctorDetailsResponse(
          doctor.title,
          doctor.name,
          doctor.firstName,
          doctor.onm,
          doctor.address,
          doctor.specialities,
          doctor.emails,
          doctor.tel
        )
      : ErrorEntity.DoctorNotFound;
  }
}
