import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[larger-image]'
})
export class LargerImageDirective {

  @HostListener('mouseover', ['$event'])
  onEnter($event) {
    $event.preventDefault();
    this.element.nativeElement.style.width = "200px"; 
    this.element.nativeElement.style.height = "200px";

  }

  @HostListener('mouseleave', ['$event'])
  onLeave($event) {
    $event.preventDefault();
    this.element.nativeElement.style.width = "50px"; 
     this.element.nativeElement.style.height = "40px";
  }

  constructor(private element: ElementRef){}
  
}