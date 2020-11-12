import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  // Build the form
  newTrainingForm = this.fb.group({
    selectedExercise: ['', [Validators.required]],
  });

  get selectedExerciseControl(): AbstractControl {
    return this.newTrainingForm.get('selectedExercise');
  }

  ngOnInit(): void {
    this.fetchExercises();
    this.exerciseSubscription = this.trainingService.availableExercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  onStartTraining(): void {
    this.trainingService.startExercise(this.selectedExerciseControl.value);
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }
}
