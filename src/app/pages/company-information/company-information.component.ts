import { Component, OnInit } from '@angular/core';
import {Company} from "../../models/company";
import {ActivatedRoute} from "@angular/router";
import {CompaniesApiService} from "../../services/companies-api.service";

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})
export class CompanyInformationComponent implements OnInit {
  companyId : number = 0;
  companyInfo: Company;
  constructor(private route:ActivatedRoute, private companies_service : CompaniesApiService) {
    this.route.params.subscribe(params=>this.companyId=params.companyId)
    this.companyInfo={} as Company;
  }

  ngOnInit(): void {
    this.getCompanyById()
  }

  getCompanyById():void{
    console.log('company',this.companyId);
    this.route.params.subscribe(params=>{console.log(params);
    })

    this.companies_service.getCompanyById(this.companyId).subscribe((response: any)=>{
      this.companyInfo=response;
      console.log(this.companyInfo);

    });

  }

  getVideoId(url : string) {
    var video_id, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video_id = (results === null) ? url : results[1];

    return video_id;
  }
}
