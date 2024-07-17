import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    this.loadInitialData();
  }

  loadInitialData() {
    if (!localStorage.getItem('users')) {
      this.users = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }]
        }
      ];
      localStorage.setItem('users', JSON.stringify(this.users));
    } else {
      this.users = JSON.parse(localStorage.getItem('users')!);
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
