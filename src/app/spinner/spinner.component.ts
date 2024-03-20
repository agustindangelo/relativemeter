import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpinnerState, SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {}
