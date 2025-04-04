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
import {JsonSliderService} from '../../services/instances/json.slider.service';
import {SliderService} from '../../services/interfaces/slider.service';
import {of, Subscription} from 'rxjs';
import {GallerySlider, TestimonialsSlider} from '../../models/interfaces/slider';

@Component({
  selector: 'slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, OnDestroy {

  service: SliderService = inject(JsonSliderService)

  gallery: GallerySlider = {title:"",images:[]}
  testimonials: TestimonialsSlider = {title:"", slides:[]};
  title: string = ""

  sub: Subscription = new Subscription();
  readonly Array = Array;

  @Input() slider: string = "";
  @Input() type: string = "";

  constructor() {}


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.type === "gallery") {
      this.service.getGallery(this.slider).subscribe(
        data => {
          this.gallery = data; this.title = data.title;
          console.log(this.gallery)
          of(this.slideElems).pipe().subscribe(
            data => {
              console.log(data.length)
              if (data.length===this.gallery.images.length) {
                console.log("hi")
                setTimeout(() => this.swiperMaker(), 50)
              }
            }
          )
        },
      )
    }
    else /*type===testimonials*/ {
      this.service.getTestimonials(this.slider).subscribe(
        data =>
        {
          this.testimonials = data; this.title = data.title;
          console.log(this.testimonials)
        }
      )
    }


  }

  @ViewChildren('galleryRef') slideElems!: QueryList<ElementRef>;
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
