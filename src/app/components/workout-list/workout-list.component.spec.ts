import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let userService: UserService;

  const mockUsers: User[] = [
    {
      name: 'John Doe',
      workouts: [{ type: 'Cardio', minutes: 30 }],
      id: 0,
    },
    {
      name: 'Jane Doe',
      workouts: [{ type: 'Strength', minutes: 45 }],
      id: 0,
    },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    userServiceSpy.getUsers.and.returnValue(mockUsers);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        FormsModule,
        BrowserAnimationsModule, // Add BrowserAnimationsModule here
        WorkoutListComponent, // Import the standalone component
      ],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users and filteredUsers on ngOnInit', () => {
    component.ngOnInit();
    expect(component.users).toEqual(mockUsers);
    expect(component.filteredUsers).toEqual(mockUsers);
  });

  it('should update itemsPerPage on onPageChange', () => {
    const pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 };
    component.onPageChange(pageEvent);
    expect(component.itemsPerPage).toBe(10);
  });

  it('should filter users by name on searchByName', () => {
    component.searchText = 'John';
    component.searchByName();
    expect(component.filteredUsers).toEqual([mockUsers[0]]);
  });

  it('should filter users by workout type on filterByType', () => {
    component.filterType = 'Cardio';
    component.filterByType();
    expect(component.filteredUsers).toEqual([mockUsers[0]]);
  });

  it('should calculate total workout time', () => {
    const totalMinutes = component.getTotalWorkoutTime(mockUsers[0].workouts);
    expect(totalMinutes).toBe(30);
  });

  it('should return paginated users', () => {
    component.itemsPerPage = 1;
    component.currentPage = 1;
    expect(component.paginatedUsers).toEqual([mockUsers[0]]);
    component.currentPage = 2;
    expect(component.paginatedUsers).toEqual([mockUsers[1]]);
  });
});
