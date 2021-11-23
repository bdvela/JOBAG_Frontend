import { Component, OnInit } from '@angular/core';
import {Company} from "../../models/company";
import {CompaniesApiService} from "../../services/companies-api.service";

@Component({
  selector: 'app-listcompanies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})

export class ListCompaniesComponent implements OnInit{

  companiesData: Company;
  companies: Array<Company>=[];

  constructor(private companies_service : CompaniesApiService) {
    this.companiesData={} as Company;

  }

  ngOnInit(): void {

    this.getAllCompanies()

  }

  getAllCompanies() : void{
    this.companies_service.getAllCompanies().subscribe((response: any)=>{
      this.companies=response.content;
      console.log(this.companies);

    })
  }

}
