import { Observable } from 'rxjs';
import { ErrorEntity } from '../../entities/errors/ErrorEntity';
import { RegisterPharmacyRequest } from '../../entities/request/RegisterPharmacyRequest';
import { RegisterPharmacyResponse } from '../../entities/response/RegisterPharmacyResponse';
import { UseCase } from './UseCase';

export interface RegisterPharmacyInputBoundary
  extends UseCase<
    RegisterPharmacyRequest,
    Observable<RegisterPharmacyResponse | ErrorEntity>
  > {}
