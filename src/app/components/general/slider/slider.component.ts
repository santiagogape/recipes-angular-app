import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {JsonSliderService} from '../../../services/instances/general/json.slider.service';
import {SliderService} from '../../../services/interfaces/general/slider.service';
import {Subscription} from 'rxjs';
import {GallerySlider, TestimonialsSlider} from '../../../models/general/slider';
import Swiper from 'swiper';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
//todo ngAfterInit
export class SliderComponent implements OnInit, OnDestroy {
  stars(valuation: number) {
    return Array(valuation).fill(0).map((_, i) => i)
  }

  service: SliderService = inject(JsonSliderService)

  gallery: GallerySlider = {title:"",images:[]}
  testimonials: TestimonialsSlider = {title:"", slides:[]};
  title: string = ""
  platformId: object = inject(PLATFORM_ID)
  sub: Subscription = new Subscription();
  readonly Array = Array;

  @Input() src: string = "";
  @Input() type: string = "";
  swiper: Swiper | undefined;

  constructor() {}


  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.swiper?.destroy(true, true);
  }

  ngOnInit(): void {
    if (this.type === "gallery") {
      this.sub = this.service.getGallery(this.src).subscribe(
        data => {
          this.gallery = data; this.title = data.title;

          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              this.initSwiper();
            }, 10);
          }
        }
      )
    }
    else /*type===testimonials*/ {
      this.service.getTestimonials(this.src).subscribe(
        testimonials =>
        {
          this.testimonials = testimonials; this.title = testimonials.title;
          console.log("testimonials",this.testimonials)
          console.log(this.testimonials.slides)
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              this.initSwiper();
            }, 10);
          }

        }
      )
    }
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
      this.swiper.autoplay.start();
    }
  }

  onNextClick() {
    this.swiper?.slideNext();
  }

  onPrevClick() {
    this.swiper?.slidePrev();
  }


}
