import {Component, OnInit} from '@angular/core';
import {Projects} from "../project/projects";
import {AppService} from "../app.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title = 'Projects List'
  public projects: Projects[];

  constructor(private projectsService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  onSearch(search: string, select: string) {
    if (!search) {
      this.projectsService.getProjects().subscribe(
        (response: Projects[]) => {
          this.projects = response;
        }
      );
    }
    if (!search && select) {
      this.projectsService.searchProject(select).subscribe(
        (response: Projects[]) => {
          this.projects = response;
        }
      );
    }
    this.projectsService.searchProject(search).subscribe(
      (response: Projects[]) => {
        this.projects = response;
      }
    );
  }

  OnDeleteProject(id: number) {
    if (confirm("Are you sure you want to delete this project?") === true) {
      this.projectsService.deleteProject(id).subscribe(
        (response: void) => {
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          this.router.navigateByUrl('/error');
          alert(error.message);
        }
      );
    }
  }

  private getProjects() {
    this.projectsService.getProjects().subscribe(
      (response: Projects[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigateByUrl('/error');
        alert(error.message);
      }
    );
  }
}
