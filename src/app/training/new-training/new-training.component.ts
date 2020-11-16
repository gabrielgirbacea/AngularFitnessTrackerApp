import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private store: Store<fromTraining.State>
  ) {}

  availableExercises$: Observable<Exercise[]>;
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
    this.availableExercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onStartTraining(): void {
    this.trainingService.startExercise(this.selectedExerciseControl.value);
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }
}
