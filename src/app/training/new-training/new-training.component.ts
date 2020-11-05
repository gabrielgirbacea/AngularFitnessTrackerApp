import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder
  ) {}

  exercices: Exercise[];

  // Build the form
  newTrainingForm = this.fb.group({
    selectedExercise: ['', [Validators.required]],
  });

  get selectedExerciseControl(): AbstractControl {
    return this.newTrainingForm.get('selectedExercise');
  }

  ngOnInit(): void {
    this.exercices = this.trainingService.getAvailableExercises();
  }

  onStartTraining(): void {
    this.trainingService.startExercise(this.selectedExerciseControl.value);
  }
}
