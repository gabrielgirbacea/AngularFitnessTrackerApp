import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 5, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  getExercises(): Exercise[] {
    return this.exercises.slice();
  }

  getRunningExercise(): Exercise {
    return this.runningExercise !== null
      ? { ...this.runningExercise }
      : this.runningExercise;
  }

  startExercise(selectedId: string): void {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );

    this.exerciseChanged.next(this.getRunningExercise());
  }

  completeExercise(): void {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.getRunningExercise());
  }

  cancelExercise(progress: number): void {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.getRunningExercise());
  }
}
