import { Observable } from 'rxjs';
import { Doctor } from '../../entities/Doctor';

export interface DoctorRepository {
  save(doctor: Doctor): Observable<Doctor>;
  get(id: string): Observable<Doctor | undefined>;
}
