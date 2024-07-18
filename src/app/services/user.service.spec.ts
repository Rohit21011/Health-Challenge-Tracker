import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);

    // Clear localStorage before each test to ensure a clean state
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data if no users are in localStorage', () => {
    service.loadInitialData();

    const users: User[] = JSON.parse(localStorage.getItem('users')!);
    expect(users.length).toBe(3);
    expect(users[0].name).toBe('John Doe');
    expect(users[1].name).toBe('Jane Smith');
    expect(users[2].name).toBe('Mike Johnson');
  });

  it('should not overwrite existing users in localStorage', () => {
    const mockUsers: User[] = [
      {
        id: 4,
        name: 'Alice Cooper',
        workouts: [{ type: 'Running', minutes: 30 }],
      },
    ];
    localStorage.setItem('users', JSON.stringify(mockUsers));

    service.loadInitialData();

    const users: User[] = JSON.parse(localStorage.getItem('users')!);
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Alice Cooper');
  });

  it('should return users', () => {
    service.loadInitialData();
    const users = service.getUsers();

    expect(users.length).toBe(3);
    expect(users[0].name).toBe('John Doe');
  });

  it('should add a user and save to localStorage', () => {
    service.loadInitialData();
    const newUser: User = {
      id: 4,
      name: 'Alice Cooper',
      workouts: [{ type: 'Running', minutes: 30 }],
    };

    service.addUser(newUser);

    const users = service.getUsers();
    expect(users.length).toBe(4);
    expect(users[3].name).toBe('Alice Cooper');

    const storedUsers: User[] = JSON.parse(localStorage.getItem('users')!);
    expect(storedUsers.length).toBe(4);
    expect(storedUsers[3].name).toBe('Alice Cooper');
  });
});
