import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    }
  ]
})
export class CounterInputComponent implements OnInit, ControlValueAccessor {

  @Input() value : number
  disabled = false

  onChange: any = () => { }
  onTouched: any = () => { }


  constructor() { }

  ngOnInit(): void {
  }

  increase() {
      this.value = +this.value + +50
      this.onChange(this.value)
  }

  decrease() {
    if (this.value >= 50) {
      this.value = this.value - 50
      this.onChange(this.value)
    }
  }

  writeValue(value: number): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }


}
