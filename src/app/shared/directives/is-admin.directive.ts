import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private localStorage: LocalStorageService) {
    const user = localStorage.getCurrentUserData();
    if (user && user.userName !== 'admin') {
      renderer.setStyle(el.nativeElement, 'display', 'none');
    }
  }

}
