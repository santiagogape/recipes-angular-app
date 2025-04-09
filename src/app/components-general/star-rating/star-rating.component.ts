import {AfterViewInit, Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements AfterViewInit, OnDestroy {
  constructor() {
  }
  private starClickHandlers: (() => void)[] = [];

  ngAfterViewInit() {
    const stars = document.querySelectorAll(".star-rating .star");

    stars.forEach(star => {
      // Definimos la función por separado para poder quitarla luego
      const clickHandler = (e: Event) => {
        const target = e.target as HTMLElement;
        const rating = target.dataset["value"];
        if (!rating) return;

        stars.forEach(s => {
          const starElement = s as HTMLElement;
          starElement.classList.toggle("selected", (starElement.dataset["value"] ?? '') <= rating);
        });

        localStorage.setItem("rating", rating);
      };

      star.addEventListener("click", clickHandler);

      // Guardamos una función que al llamarla quite el listener
      this.starClickHandlers.push(() => {
        star.removeEventListener("click", clickHandler);
      });
    });

    // Guardar también el de beforeunload si quieres
    this.beforeUnloadHandler = () => {
      console.log(localStorage.getItem("rating"));
    };
    window.addEventListener("beforeunload", this.beforeUnloadHandler);
  }

  private beforeUnloadHandler!: () => void;

  ngOnDestroy() {
    // Limpiar todos los listeners de estrellas
    this.starClickHandlers.forEach(remove => remove());
    this.starClickHandlers = [];

    // Limpiar el listener de window
    if (this.beforeUnloadHandler) {
      window.removeEventListener("beforeunload", this.beforeUnloadHandler);
    }
  }
}
