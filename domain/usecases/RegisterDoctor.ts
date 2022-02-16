import { Builder } from 'builder-pattern/dist/src/Builder';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from '../entities/Doctor';
import { ErrorEntity } from '../entities/errors/ErrorEntity';
import { RegisterDoctorRequest } from '../entities/request/RegisterDoctorRequest';
import { RegisterDoctorResponse } from '../entities/response/RegisterDoctorResponse';
import { UserCredential } from '../entities/UserCredential';
import { RegisterDoctorInputBoundary } from '../ports/in/RegisterDoctorInputBoundary';
import { DoctorRepository } from '../ports/out/DoctorRepository';
import { UserCredentialRepository } from '../ports/out/UserCredentialRepository';

export class RegisterDoctor implements RegisterDoctorInputBoundary {
  constructor(
    private doctorRepository: DoctorRepository,
    private userCredentialRepository: UserCredentialRepository
  ) {}

  execute(
    input: RegisterDoctorRequest
  ): Observable<Observable<RegisterDoctorResponse> | ErrorEntity> {
    return this.userCredentialRepository
      .save(this.buildUserCredential(input))
      .pipe(
        map((credential: UserCredential) => this.saveDoctor(credential, input)),
        map(this.buildResponse)
      );
  }

  private buildResponse(
    input: Observable<Doctor> | ErrorEntity
  ): Observable<RegisterDoctorResponse> | ErrorEntity {
    if (input instanceof Observable) {
      return input.pipe(map((doctor) => new RegisterDoctorResponse(doctor.id)));
    } else {
      return input;
    }
  }

  private saveDoctor(
    credential: UserCredential,
    input: RegisterDoctorRequest
  ): Observable<Doctor> | ErrorEntity {
    if (!credential.id) {
      return ErrorEntity.UserAlreadyRegistered;
    } else {
      return this.doctorRepository.save(this.buildDoctor(credential, input));
    }
  }

  private buildDoctor(
    credential: UserCredential,
    registerDoctorRequest: RegisterDoctorRequest
  ): Doctor {
    return Builder(Doctor)
      .emails(registerDoctorRequest.emails)
      .billingId(registerDoctorRequest.billingId)
      .address(registerDoctorRequest.address)
      .firstName(registerDoctorRequest.firstName)
      .name(registerDoctorRequest.name)
      .onm(registerDoctorRequest.onm)
      .specialities(registerDoctorRequest.specialities)
      .tel(registerDoctorRequest.tel)
      .title(registerDoctorRequest.title)
      .userCredentialId(credential.id)
      .build();
  }

  private buildUserCredential(input: RegisterDoctorRequest): UserCredential {
    return Builder(UserCredential).isDoctor(true).login(input.login).build();
  }
}
