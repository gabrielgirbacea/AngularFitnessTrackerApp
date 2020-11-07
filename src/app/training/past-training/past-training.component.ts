import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private trainingService: TrainingService) {}

  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  finishedExercisesChangedSubscription: Subscription;

  ngOnInit(): void {
    this.finishedExercisesChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchFinishedExercises();
  }

  ngOnDestroy(): void {
    if (this.finishedExercisesChangedSubscription) {
      this.finishedExercisesChangedSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
