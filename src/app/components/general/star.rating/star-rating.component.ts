import {Component} from '@angular/core';

@Component({
  selector: 'star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})

export class StarRatingComponent {
  constructor() {}

  rate(event: MouseEvent){
    let target = event.target as HTMLElement;
    let forward = target;
    const rating = target.dataset["value"];
    if (!rating) return;


    function toggle(target: HTMLElement, rating: string) {
      return target.classList.toggle("selected", (target.dataset["value"] ?? '') <= rating);
    }

    for (let i = Number.parseInt(rating); i > 0; i--) {
      toggle(target, rating)
      target = target.previousElementSibling as HTMLElement;
    }
    for (let i = Number.parseInt(rating) + 1; i < 6; i++) {
      forward = forward.nextElementSibling as HTMLElement;
      toggle(forward, rating);
    }

    localStorage.setItem("rating", rating);
  }
}
