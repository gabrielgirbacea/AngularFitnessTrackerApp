import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
})
export class SharedModule {}
