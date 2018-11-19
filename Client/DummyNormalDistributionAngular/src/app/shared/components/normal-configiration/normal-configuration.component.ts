import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { INormal } from '../../../models/INormal.model';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-normal-configuration',
  templateUrl: './normal-configuration.component.html',
  styleUrls: ['./normal-configuration.component.css']
})
export class NormalConfigurationComponent implements OnInit {

  @Input() title = '';
  @Output() normalSelected: EventEmitter<INormal> = new EventEmitter<INormal>();

  step = 0.01;
  @Input() mean: any = 0;
  @Input() dev: any = 1;
  subject: Subject<INormal> = new Subject<INormal>();

  ngOnInit(): void {
    this.mean *= 100;
    this.dev *= 100;
    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(normal => this.normalSelected.emit(normal));
  }

  onMeanSelected(value) {
    this.subject.next({
      mean: this.mean * this.step,
      dev: this.dev * this.step
    });
  }

  onDevSelected(value) {
    this.subject.next({
      mean: this.mean * this.step,
      dev: this.dev * this.step
    });
  }

}
