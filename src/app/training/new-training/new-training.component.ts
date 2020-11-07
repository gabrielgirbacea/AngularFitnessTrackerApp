import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
    private db: AngularFirestore
  ) {}

  exercises: Exercise[];
  exerciseSubscription: Subscription;

  // Build the form
  newTrainingForm = this.fb.group({
    selectedExercise: ['', [Validators.required]],
  });

  get selectedExerciseControl(): AbstractControl {
    return this.newTrainingForm.get('selectedExercise');
  }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubscription = this.trainingService.availableExercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(): void {
    this.trainingService.startExercise(this.selectedExerciseControl.value);
  }
}
