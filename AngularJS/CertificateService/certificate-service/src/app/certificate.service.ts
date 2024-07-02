import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  API = "http://localhost:8080/certificateservice";

  constructor(private http: HttpClient) { }

  // Register a new certificate
  public registerCertificate(certificateData: any) {
    return this.http.post(this.API, certificateData);
  }

  // Get all certificates
  public getCertificates() {
    return this.http.get(this.API);
  }

  // Get certificate by ID
  public getCertificateById(id: number) {
    return this.http.get(`${this.API}/${id}`);
  }

  // Delete certificate by ID
  public deleteCertificate(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

  // Update certificate
  public updateCertificate(id: number, certificate: any) {
    return this.http.put(`${this.API}/${id}`, certificate);
  }
}
