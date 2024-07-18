import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WorkoutListComponent,
    AddWorkoutComponent,
    WorkoutChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fyle-internship-challenge';
}
