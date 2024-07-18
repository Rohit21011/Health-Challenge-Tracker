import { Component } from '@angular/core';
import { User, workoutForm } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatPaginatorModule,
    MatSelect,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css',
})
export class AddWorkoutComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  newUserName: string = '';
  newWorkoutType: string = '';
  newWorkoutMinutes: number = 0;

  workoutForm: FormGroup;

  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.users = this.userService.getUsers();
    this.filteredUsers = this.users;
  }
  initializeForm() {
    this.workoutForm = this.fb.group({
      name: ['', [Validators.required]],
      types: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
    });
  }
  addWorkout(value: workoutForm) {
    if (this.workoutForm.invalid) {
      return;
    }
    const existingUser = this.users.find(
      (user) => user.name.toLowerCase() === value.name.toLowerCase()
    );

    if (existingUser) {
      const existingWorkout = existingUser.workouts.find(
        (workout) => workout.type === value.types
      );
      existingWorkout
        ? (existingWorkout.minutes += value.minutes)
        : existingUser.workouts.push({
            type: value.types,
            minutes: value.minutes,
          });
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        name: value.name,
        workouts: [{ type: value.types, minutes: value.minutes }],
      };
      this.userService.addUser(newUser);
    }
    this.workoutForm.reset();
    (Object as any)
      .values(this.workoutForm.controls)
      .forEach((control: FormControl) => {
        control.markAsUntouched();
        control.markAsPristine();
      });
    this.filteredUsers = this.users;
    this.snackBar.open('Workout added successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
