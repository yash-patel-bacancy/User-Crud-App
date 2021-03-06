import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecordsService } from '../service/records.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  public users: User[] = [];
  private id: number;
  public currentPage : number = 1;
  public totalPages: number[]=[];
  subscription: Subscription;
  
  constructor(private recordsService: RecordsService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }

  getUsers(page: number){
    this.recordsService.getUsersFromPage(page).subscribe(
      responceData => {
        this.users= responceData.data;
        this.recordsService.setUsers(this.users);
        this.totalPages= Array(responceData.total_pages);
      }
    );
    this.currentPage=page;
  }

  public onEditUser(id: number): void{
    this.router.navigateByUrl(`/recordlist/${id}`);
    //this.router.navigate([id], {relativeTo: this.route});
 }
  
  public onDeleteUser(id: number): void{
    this.recordsService.deleteUser(id);
    this.router.navigate(['/recordlist']);
  }
}
