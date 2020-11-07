import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  constructor(private db: AngularFirestore, private uiService: UIService) {}

  private availableExercises: Exercise[];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];
  runningExerciseChanged = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  fetchAvailableExercises(): void {
    this.uiService.loadingStateChanged.next(true);

    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: (doc.payload.doc.data() as Exercise).name,
                duration: (doc.payload.doc.data() as Exercise).duration,
                calories: (doc.payload.doc.data() as Exercise).calories,
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);

            this.availableExercises = exercises;
            this.availableExercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            this.uiService.showSnackbar(
              'Fetching Exercises failed. Please try again.',
              null,
              3000
            );
            this.uiService.loadingStateChanged.next(false);
            this.availableExercisesChanged.next(null);
          }
        )
    );
  }

  fetchFinishedExercises(): void {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((finishedExercises: Exercise[]) => {
          this.finishedExercisesChanged.next(finishedExercises);
        })
    );
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

    this.runningExerciseChanged.next(this.getRunningExercise());
  }

  completeExercise(): void {
    this.addDatatToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(this.getRunningExercise());
  }

  cancelExercise(progress: number): void {
    this.addDatatToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled',
    });
    this.runningExercise = null;
    this.runningExerciseChanged.next(this.getRunningExercise());
  }

  cancelSubscrptions(): void {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }

  private addDatatToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }
}
