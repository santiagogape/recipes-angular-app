import { isPlatformBrowser } from "@angular/common";
import {inject, Injectable, OnDestroy, PLATFORM_ID} from "@angular/core";
import Swiper from 'swiper';

@Injectable({providedIn: 'root'})
export abstract class Slider implements OnDestroy {
  platformId: object = inject(PLATFORM_ID)
  swiper: Swiper | undefined;


  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }

  initSwiper() {
    if (isPlatformBrowser(this.platformId)) {
      console.log("hi")
      this.swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: 1,
        observeParents: true,
        observer: true
      });
      console.log(this.swiper)
      this.swiper.update();
      console.log(this.swiper.autoplay)
      this.swiper.autoplay?.start();
    }
  }

  onNextClick() {
    this.swiper?.slideNext();
  }

  onPrevClick() {
    this.swiper?.slidePrev();
  }
}
