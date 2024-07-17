export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

export interface workoutForm {
  name: string;
  types: string;
  minutes: number;
}
