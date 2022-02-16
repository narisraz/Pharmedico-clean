import { Observable } from 'rxjs';
import { UserCredential } from '../../entities/UserCredential';

export interface UserCredentialRepository {
  save(userCredential: UserCredential): Observable<UserCredential>;
}
