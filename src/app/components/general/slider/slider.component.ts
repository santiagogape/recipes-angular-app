import {
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import Swiper from 'swiper';
import {JsonSliderService} from '../../../services/instances/general/json.slider.service';
import {SliderService} from '../../../services/interfaces/general/slider.service';
import {of, Subscription} from 'rxjs';
import {GallerySlider, TestimonialsSlider} from '../../../models/general/slider';

@Component({
  selector: 'slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
//todo ngAfterInit
export class SliderComponent implements OnInit, OnDestroy {

  service: SliderService = inject(JsonSliderService)

  gallery: GallerySlider = {title:"",images:[]}
  testimonials: TestimonialsSlider = {title:"", slides:[]};
  title: string = ""

  sub: Subscription = new Subscription();
  readonly Array = Array;

  @Input() src: string = "";
  @Input() type: string = "";

  constructor() {}


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.type === "gallery") {
      this.sub = this.service.getGallery(this.src).subscribe(
        data => {
          this.gallery = data; this.title = data.title;
          of(this.galleryElems).pipe().subscribe(
            data => {
              if (data.length===this.gallery.images.length) {
                setTimeout(() => this.swiperMaker(), 50)
              }
            }
          )
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
          of(this.testimonialsElems).pipe().subscribe(
            data => {

              if (data.length===this.testimonials.slides.length) {
                setTimeout(() => this.swiperMaker(), 50)
              }
            }
          )
        }
      )
    }


  }

  @ViewChildren('galleryRef') galleryElems!: QueryList<ElementRef>;
  @ViewChildren('testimonialsRef') testimonialsElems!: QueryList<ElementRef>;
  /*
  * ngAfterViewInit(): void {
    // Detectar cuando cambian los slides renderizados por @for
    this.slideElems.changes.subscribe(() => {
      if (this.slideElems.length === this.gallery.images.length) {
        console.log(this.slideElems.length + " bye");
        setTimeout(() => this.swiperMaker().destroy(true,false), 100)
        setTimeout(() => this.swiperMaker(), 100);
      }
    });
  }
  * */

  swiperMaker() {
    return new Swiper(".swiper", {
      loop: true, // Hace que el slider sea infinito
      autoplay: {
        delay: 2000, // Cambia de slide cada 3 segundos
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      observeParents: true,  // <--- importante si tu swiper está en un componente condicional
      observer: true          // <--- observa cambios en el DOM
    });
  }
}
