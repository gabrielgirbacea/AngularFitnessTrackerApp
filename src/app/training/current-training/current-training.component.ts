import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer;

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    this.timer = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }

      this.progress += 0.001;

    }, 1);
  }

  onStop(): void {
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingExit.emit();
      }
      else{
        this.startOrResumeTimer();
      }
    });
    clearInterval(this.timer);
  }
}
