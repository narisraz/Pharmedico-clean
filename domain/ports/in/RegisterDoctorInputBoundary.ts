import { Observable } from 'rxjs';
import { ErrorEntity } from '../../entities/errors/ErrorEntity';
import { RegisterDoctorRequest } from '../../entities/request/RegisterDoctorRequest';
import { RegisterDoctorResponse } from '../../entities/response/RegisterDoctorResponse';
import { UseCase } from './UseCase';

export interface RegisterDoctorInputBoundary
  extends UseCase<
    RegisterDoctorRequest,
    Observable<Observable<RegisterDoctorResponse> | ErrorEntity>
  > {}
