import {Component, OnInit, inject, signal, OnDestroy, effect} from '@angular/core';
import { AuthService } from '@services/firebase/auth.service';
import {CommonModule} from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription} from 'rxjs';
import {FirestoreService} from '@services/firebase/firestore.service';
import {ID} from '@services/firebase/databaseAPI';
import {ImageSrc, ImageSrcInitializer} from '@models/general/ImageSrc';
import {Header} from '@models/general/header';

interface navigation {
  routerLink: string[]
}

interface NavbarData extends ID{
  links: NavLink[];
  mobileLinks: MobileNavLink[];
  buttons: NavLink[];
  logo: ImageSrc
}

interface NavLink extends navigation {
  label: string;
}

interface MobileNavLink extends navigation {
  image: ImageSrc
  header: Header
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected auth = inject(AuthService);
  firestore =  inject(FirestoreService)
  router = inject(Router)

  constructor() {
    effect(() => {
      console.log(this.logged(), this.auth.currentUserID())
      console.log(this.navbarData().buttons)
    });
  }
  navbarData  =  signal<NavbarData>({links:[],buttons:[],mobileLinks:[],logo:ImageSrcInitializer()});
  mobileMenuOpen = false;
  logged = signal(false)

  root = "web"
  navbarCommon = "navigation"
  navbarSession = "navigationAuthenticated"

  sub: Subscription = new Subscription()

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit() {
    this.loadNavbar();
  }

  loadNavbar() {
    this.auth.isLoggedIn$.subscribe((logged) => {
      if (logged) {
        this.sub.unsubscribe()
        this.sub = this.firestore.readDocument<NavbarData>(this.navbarSession,this.root).subscribe((nav) => {
          this.navbarData.set(nav)
        })
        this.logged.set(true)
      } else {
        this.sub.unsubscribe()
        this.sub = this.firestore.readDocument<NavbarData>(this.navbarCommon, this.root).subscribe((nav) => {
          this.navbarData.set(nav)
        })
        this.logged.set(false)

      }
    })

  }

  logout() {
    this.auth.signOut().then(r => console.log(r));
    this.mobileMenuOpen = false;
    this.router.navigate(['/home']).then(() => console.log("redirect"));
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  readonly LOGOUT = "Log out";
  readonly logOutButton = {label:this.LOGOUT,routerLink:["/home"]} as NavLink
}
