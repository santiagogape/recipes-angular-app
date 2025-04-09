import { Component } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  constructor() {
    const stars = document.querySelectorAll(".star-rating .star");

    stars.forEach(star => {
      star.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement; // 👈 afirmamos que es un HTMLElement
        const rating = target.dataset["value"];

        if (!rating) return; // Por si acaso no tiene el data-value

        stars.forEach(s => {
          const starElement = s as HTMLElement; // también afirmamos el tipo aquí
          starElement.classList.toggle("selected", (starElement.dataset["value"] ?? '') <= rating);
        });

        localStorage.setItem("rating", rating);
      });
    });

    window.addEventListener("beforeunload", () => {
      console.log(localStorage.getItem("rating"));
    });
  }

}
