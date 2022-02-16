import { Observable } from 'rxjs';
import { ErrorEntity } from '../../entities/errors/ErrorEntity';
import { GetDoctorDetailsRequest } from '../../entities/request/GetDoctorDetailsRequest';
import { GetDoctorDetailsResponse } from '../../entities/response/GetDoctorDetailsResponse';
import { UseCase } from './UseCase';

export interface GetDoctorDetailsInputBoundary
  extends UseCase<
    GetDoctorDetailsRequest,
    Observable<GetDoctorDetailsResponse | ErrorEntity>
  > {}
