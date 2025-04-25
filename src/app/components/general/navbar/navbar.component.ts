import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/firebase/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface NavbarData {
  links: NavLink[];
  mobileLinks: MobileNavLink[];
  buttons: NavButton[];
}

interface NavLink {
  id: string;
  href: string;
  label: string;
}

interface MobileNavLink extends NavLink {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}

interface NavButton {
  id: string;
  href: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  protected auth = inject(AuthService);
  private http = inject(HttpClient);

  constructor(private router: Router) {}

  navbarData$!: Observable<NavbarData>;
  mobileMenuOpen = false;

  ngOnInit() {
    this.loadNavbar();
  }

  loadNavbar() {
    this.navbarData$ = this.http.get<NavbarData>('/assets/general/navbar.json');
  }

  logout() {
    this.auth.signOut().then(r => console.log(r));
    this.mobileMenuOpen = false;
    this.router.navigate(['/home']).then(() => this.loadNavbar());

  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
