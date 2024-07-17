import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import {
  CanvasJS,
  CanvasJSAngularChartsModule,
} from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule, CommonModule],
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css',
})
export class WorkoutChartComponent implements OnInit {
  user: User[];

  chartOptions: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.getUsers();
    this.updateChartData(this.user[0]);
  }
  showGraph(user: User) {
    this.updateChartData(user);
  }

  updateChartData(user: User): void {
    if (user) {
      const dataPoints = user.workouts.map((workout) => ({
        label: workout.type,
        y: workout.minutes,
      }));
      let chart = new CanvasJS.Chart('chartContainer', {
        theme: 'light1', // "light2", "dark1", "dark2"
        title: {
          text: 'Basic Column Chart in Angular 12',
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
