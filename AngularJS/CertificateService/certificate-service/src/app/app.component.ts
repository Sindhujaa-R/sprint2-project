import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'certificate-module';

  certificateDetails: any = null;
  certificateToUpdate = {
    certid: 0,
    studname: "",
    dept: "",
    grade: "",
    year: "",
    gender: "",
    dateofissue: ""
  };

  constructor(private certificateService: CertificateService) {}

  ngOnInit() {
    this.getCertificateDetails();
  }

  register(registerForm: NgForm) {
    const newCertificate = { ...registerForm.value, certid: undefined }; // Do not set certid
    this.certificateService.registerCertificate(newCertificate).subscribe(
      (resp: any) => {
        console.log(resp);
        registerForm.reset();
        this.getCertificateDetails();
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  getCertificateDetails() {
    this.certificateService.getCertificates().subscribe(
      (resp) => {
        console.log(resp);
        this.certificateDetails = resp;
      }, (err) => {
        console.log(err);
      }
    );
  }

  deleteCertificate(certificate: any) {
    this.certificateService.deleteCertificate(certificate.certid).subscribe(
      (resp) => {
        console.log(resp);
        this.getCertificateDetails();
      }, (err) => {
        console.log(err);
      }
    );
  }

  edit(certificate: any) {
    this.certificateToUpdate = { ...certificate, dateofissue: new Date(certificate.dateofissue).toISOString().split('T')[0] };
  }

  updateCertificate(updateForm: NgForm) {
    this.certificateService.updateCertificate(this.certificateToUpdate.certid, this.certificateToUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.getCertificateDetails();
        this.resetCertificateToUpdate(); // Reset the object after update
        updateForm.resetForm(); // Reset the form after update
      }, (err) => {
        console.log(err);
      }
    );
  }

  resetCertificateToUpdate() {
    this.certificateToUpdate = {
      certid: 0,
      studname: "",
      dept: "",
      grade: "",
      year: "",
      gender: "",
      dateofissue: ""
    };
  }
}
