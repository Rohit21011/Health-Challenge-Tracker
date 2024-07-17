import { MatCardModule } from '@angular/material/card';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';



@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css'
})
export class WorkoutChartComponent implements OnChanges {
  @Input() user: any = {};  // Assuming User model from user.service
  users: User[] = [];
  selectedUser: User | null = null;

  chartOptions: any = {
    title: {
      text: "User Workout Chart"
    },
    data: [{
      type: "column",
      dataPoints: []
    }]
  };

  constructor(private userService: UserService) {
    this.user = {} as User; // Initialize with an empty object or default value
  }

  ngOnInit(): void {
    this.user = this.userService.getUsers(); // Assuming userService returns a single user object
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.selectedUser = changes['user'].currentValue;
      this.updateChart();
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.updateChart();
  }

  updateChart(): void {
    if (!this['user']) {
      return;
    }

    const dataPoints = this['user'].workouts.map((workout: any) => ({
      label: workout.type,
      y: workout.time
    }));

    // Update chartOptions with new dataPoints
    this.chartOptions = {
      ...this.chartOptions,
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    };
  }

}
