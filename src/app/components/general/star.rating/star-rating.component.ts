import {Component, output} from '@angular/core';

@Component({
  selector: 'star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})

export class StarRatingComponent {
  valuation = output<number>();
  constructor() {}

  async rate(event: MouseEvent){
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
    // todo: transaction
    /**
     * const firestore = inject(Firestore);
     *
     * const postRef = doc(firestore, 'users/${this.user()}/recipes/${this.recipe()}') as DocumentReference<Recipe>;
     *
     * await runTransaction(firestore, async (transaction) => {
     *   const postSnap = await transaction.get(postRef);
     *
     *   if (!postSnap.exists()) {
     *     throw new Error('El documento no existe');
     *   }
     *
     *   const votes = postSnap.votes|| 0;
     *   const stars = postSnap.stars || 0;
     *   transaction.update(postRef, { votes: votes + 1, stars: recalculate(rates,votes,rating) });
     * });
     */
    localStorage.setItem("rating", rating);
    this.valuation.emit(Number(rating))
  }

  recalculate(rates: number, votes: number, rating: number): number {
    return (rates * votes + rating) / (votes + 1)
  }
}
