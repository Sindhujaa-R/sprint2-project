import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  API="http://localhost:8080";
  public registerCertificate(certificateData: any)
  {
    return this.http.post(this.API + '/registerCertificate' , certificateData);
  }

  public getCertificate(){
    return this.http.get(this.API+'/getCertificate');
  }

  public deleteCertificate(C_id:any){
    return this.http.delete(this.API+'/deleteCertificate?C_id=' + C_id);
  }

  public updateCertificate(certificate: any){
    return this.http.put(this.API +'/updateCertificate', certificate);
  }
  constructor(private http: HttpClient) { }
}
