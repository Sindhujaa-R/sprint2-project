import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'certificate-module';
constructor(private CertificateService: CertificateService){
  this.getCertificateDetails();
}

  register(registerForm: NgForm){
    this.CertificateService.registerCertificate(registerForm.value).subscribe(
      (resp: any)=>{
        console.log(resp);
        registerForm.reset();
        this.getCertificateDetails();

      },(err: any)=>{
        console.log(err);
      }
    );
  }

  getCertificateDetails(){
    this.CertificateService.getCertificate().subscribe(
      (resp)=>{
        console.log(resp);
        this.certificateDetails=resp;
      }, (err)=>{
        console.log(err);
      }
    );
  }

  certificateDetails= null as any;

  deleteCertificate(certificate: any){
    this.CertificateService.deleteCertificate(certificate.sid).subscribe(
      (resp)=>{
        console.log(resp);
        this.getCertificateDetails();
      },(err)=>{
        console.log(err);
      }
    );
  }
 
  certificateToUpdate={
    C_id: "",
    C_name: "",
    C_dept: "",
    c_grade:"",
    year: "",
    gender: "",
    dateofissue: ""
  };

  edit(certificate: any){
    this.certificateToUpdate=certificate;
  }
  updateCertificate(){
    this.CertificateService.updateCertificate(this.certificateToUpdate).subscribe(
      (resp)=>{
        console.log(resp);
      },(err)=>{
        console.log(err);
      }
    );
  }
  
}
