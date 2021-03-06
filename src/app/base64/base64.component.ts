import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AnimateTextUpdateService } from '../animate-text-update.service';
import 'rxjs/add/operator/finally';


@Component({
  templateUrl: './base64.component.html',
  styleUrls: ['./base64.component.scss']
})
export class Base64Component {

  private errorSubject = new Subject<any>();

  error$ = this.errorSubject.asObservable();
  text: string;
  enableTranscode = false;

  constructor(private textUpdate: AnimateTextUpdateService) { }


  onTextChanged(value: string) {
    this.text = value;
    this.enableTranscode = (value.trim().length > 0);
  }

  encode(event: Event): void {
    try {
      const encodedText = btoa(encodeURIComponent(this.text).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      }));

      this.replaceText(encodedText);
    }
    catch (e) {
      this.errorSubject.next(e);
    }

    event.preventDefault();
  }


  decode(event: Event): void {
    try {
      const decodedText = decodeURIComponent(Array.prototype.map.call(atob(this.text), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      this.replaceText(decodedText);
    }
    catch (e) {
      this.errorSubject.next(e);
    }

    event.preventDefault();
  }

  private replaceText(newText: string) {
    this.enableTranscode = false;

    this.textUpdate.updateToTextWithAnimation(newText)
      .finally(() => {
        this.enableTranscode = true;
      })
      .subscribe((text: string) => {
        this.text = text;
      });
  }
}
