import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private uiService: UIService
  ) {}

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  loadingSubscription: Subscription;
  isLoading = true;

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
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }

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
