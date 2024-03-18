import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarketService } from '../market.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public assets: any[] | undefined;
  public selectedFirstAsset = '';
  public selectedSecondAsset = '';
  public today = new Date();

  form = new FormGroup({
    firstAsset: new FormControl(''),
    secondAsset: new FormControl(''),
    fromDate: new FormControl(new Date(this.today.getFullYear() - 2, this.today.getMonth(), this.today.getDate()).toISOString().slice(0,10)),
    tillDate: new FormControl(new Date().toISOString().slice(0,10)),
  })

  private subscriptions: Subscription[] = []

  constructor(private market: MarketService) {}

  ngOnInit(): void {
    const bonds$ = this.market.getBonds()
    const cedears$ = this.market.getCedears()
    const equity$ = this.market.getLeadingEquity()
    const indices$ = this.market.getIndices()
    
    this.subscriptions.push(
      forkJoin([bonds$, cedears$, equity$, indices$]).subscribe(
        ([bonds, cedears, equity, indices]) => {
          this.assets = [...bonds.data, ...cedears, ...equity.data, ...indices.data]
        }
      )
    )
    // this.fromDate = new Date(this.today.getTime()).setFullYear(this.today.getFullYear)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}