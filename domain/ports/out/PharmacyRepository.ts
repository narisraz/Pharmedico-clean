import { Observable } from 'rxjs';
import { Pharmacy } from '../../entities/Pharmacy';

export interface PharmacyRepository {
  save(pharmacy: Pharmacy): Observable<Pharmacy>;
}
