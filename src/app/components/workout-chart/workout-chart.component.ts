import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {
  CanvasJS,
  CanvasJSAngularChartsModule,
} from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
    CommonModule,
    MatListModule,
    MatCardModule,

  ],
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css',
})
export class WorkoutChartComponent implements OnInit {
  user: User[];
  selectedUser: User | null = null;
  chartOptions: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.getUsers();
    this.updateChartData(this.user[0]);
    this.selectedUser = this.user[0];
  }
  showGraph(user: User) {
    this.updateChartData(user);
    this.selectedUser = user;
  }

  updateChartData(user: User): void {
    if (user) {
      const dataPoints = user.workouts.map((workout) => ({
        label: workout.type,
        y: workout.minutes,
      }));
      let chart = new CanvasJS.Chart('chartContainer', {
        theme: 'light2',
        title: {
          text: user.name,
        },
        data: [
          {
            type: 'column', // Change type to "bar", "area", "spline", "pie",etc.
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();
    }
  }
}
