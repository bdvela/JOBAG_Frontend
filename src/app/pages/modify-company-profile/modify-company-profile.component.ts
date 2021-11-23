import { Component, OnInit } from '@angular/core';
import {Employeer} from "../../models/employeer";
import {ModifyCompanyProfileApiService} from "../../services/modify-company-profile-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../../models/company";
import {MatDialog} from "@angular/material/dialog";
import {DialogContratComponent} from "../dialog-changes-saved-successfully/dialog-contrat.component";

@Component({
  selector: 'app-modify-company-profile',
  templateUrl: './modify-company-profile.component.html',
  styleUrls: ['./modify-company-profile.component.css']
})
export class ModifyCompanyProfileComponent implements OnInit {
  //companyData: Company;

  companyData: Company = {} as Company;
  employeerData: Employeer = {} as Employeer;

  employeerId!: number;

  constructor(private companiesApi: ModifyCompanyProfileApiService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    this.companyData = {} as Company;
    this.employeerData = {} as Employeer;
  }

  newname!: string;
  newdescription!: string;
  newlogo!: string;
  newruc!: number;
  newdireccion!: string;
  new_url_video!: string;

  ngOnInit(): void {
    //this.getAllCompanies();
    //this.employeerId = Number(this.route.params);
    this.getEmployeerData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContratComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.router.navigate(['/employeer/', this.employeerId, 'myaccount']);
    })
  }

  getAllCompanies():void{
    this.employeerId = Number(this.route.params.subscribe(params => {
      this.companiesApi.getCompaniesByEmployeerId(params.employeerId)
        .subscribe((response: any) => {
          this.employeerId = params.employeerId;
          this.companyData = response.content[0];
          console.log(this.companyData);
        })
    }))
  }

  getEmployeerData():void{
    this.employeerId = Number(this.route.params.subscribe(params => {
      this.companiesApi.getEmployeerbyId(params.employeerId)
        .subscribe((response: any) => {
          this.employeerId = params.employeerId;
          this.employeerData = response;
          console.log(this.employeerData);
        })
    }))
  }

  updateCompany(): void {
    const newCompany = {
      id: this.companyData.id,
      name: this.newname,
      description: this.newdescription,
      logo: this.newlogo,
      ruc: this.newruc,
      direccion: this.newdireccion,
      idEmployeer: this.companyData.idEmployeer,
      firstnameEmployeer: this.companyData.firstnameEmployeer,
      lastnameEmployeer: this.companyData.lastnameEmployeer,
      emailEmployeer: this.companyData.emailEmployeer,
      numberEmployeer: this.companyData.numberEmployeer,
      passwordEmployeer: this.companyData.passwordEmployeer,
      documentEmployeer: this.companyData.documentEmployeer,
      idSector: this.companyData.idSector,
      nameSector: this.companyData.nameSector,
      descriptionSector: this.companyData.descriptionSector,
      url_video: this.new_url_video
    };

    this.companiesApi.updateCompany(this.employeerId, this.companyData.idSector, newCompany)
      .subscribe(response => {
        console.log(response);
        this.openDialog();
      });
  }

  addCompany(): void{
    const newCompany = {
      id: this.companyData.id,
      name: this.companyData.name,
      description: this.companyData.description,
      logo: this.companyData.logo,
      ruc: this.companyData.ruc,
      direccion: this.companyData.direccion,
      url_video: this.companyData.url_video,
      idEmployeer: this.employeerId,
      firstnameEmployeer: this.employeerData.firstname,
      lastnameEmployeer: this.employeerData.lastname,
      emailEmployeer: this.employeerData.email,
      numberEmployeer: this.employeerData.number,
      passwordEmployeer: this.employeerData.password,
      documentEmployeer: this.employeerData.document,
      idSector: this.companyData.idSector,
      nameSector: this.companyData.nameSector,
      descriptionSector: this.companyData.descriptionSector
    };

    this.companiesApi.addCompany(this.employeerId, this.companyData.idSector, newCompany)
      .subscribe((response: any) => {
        console.log(response)
      });
  }

}
