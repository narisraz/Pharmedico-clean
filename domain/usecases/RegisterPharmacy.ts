import { Builder } from 'builder-pattern/dist/src/Builder';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ErrorEntity } from '../entities/errors/ErrorEntity';
import { Pharmacy } from '../entities/Pharmacy';
import { RegisterPharmacyRequest } from '../entities/request/RegisterPharmacyRequest';
import { RegisterPharmacyResponse } from '../entities/response/RegisterPharmacyResponse';
import { UserCredential } from '../entities/UserCredential';
import { RegisterPharmacyInputBoundary } from '../ports/in/RegisterPharmacyInputBoundary';
import { PharmacyRepository } from '../ports/out/PharmacyRepository';
import { UserCredentialRepository } from '../ports/out/UserCredentialRepository';

export class RegisterPharmacy implements RegisterPharmacyInputBoundary {
  constructor(
    private pharmacyRepository: PharmacyRepository,
    private userCredentialRepository: UserCredentialRepository
  ) {}

  execute(
    input: RegisterPharmacyRequest
  ): Observable<RegisterPharmacyResponse | ErrorEntity> {
    return this.userCredentialRepository
      .save(this.buildUserCredential(input))
      .pipe(
        switchMap((credential: UserCredential) =>
          this.savePharmacy(credential, input)
        )
      );
  }

  private savePharmacy(
    credential: UserCredential,
    input: RegisterPharmacyRequest
  ): Observable<RegisterPharmacyResponse | ErrorEntity> {
    return this.pharmacyRepository
      .save(this.buildPharmacy(credential, input))
      .pipe(map(this.buildResponse));
  }

  private buildResponse(
    pharmacy: Pharmacy
  ): RegisterPharmacyResponse | ErrorEntity {
    return pharmacy.id
      ? new RegisterPharmacyResponse(pharmacy.id)
      : ErrorEntity.UserAlreadyRegistered;
  }

  private buildPharmacy(
    credential: UserCredential,
    RegisterPharmacyRequest: RegisterPharmacyRequest
  ): Pharmacy {
    return Builder(Pharmacy)
      .emails(RegisterPharmacyRequest.emails)
      .billingId(RegisterPharmacyRequest.billingId)
      .address(RegisterPharmacyRequest.address)
      .name(RegisterPharmacyRequest.name)
      .tel(RegisterPharmacyRequest.tel)
      .userCredentialId(credential.id)
      .responsablesId(RegisterPharmacyRequest.responsablesId)
      .build();
  }

  private buildUserCredential(input: RegisterPharmacyRequest): UserCredential {
    return Builder(UserCredential).isPharmacy(true).login(input.login).build();
  }
}
