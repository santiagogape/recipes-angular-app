En Angular, los RouterLink se definen en la plantilla (.html) para manejar la navegación sin recargar la página. Se usan dentro de las etiquetas HTML, generalmente en botones o enlaces.

📌 Ejemplo básico de RouterLink
Si tienes las siguientes rutas en app.routes.ts:

```typescript
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
];
```

Puedes definir los RouterLink en el HTML así:

```html
<a routerLink="/dashboard">Ir al Dashboard</a>
<a routerLink="/login">Iniciar Sesión</a>
```
O con botones:
```html
<button [routerLink]="'/dashboard'">Ir al Dashboard</button>
<button [routerLink]="'/login'">Iniciar Sesión</button>
```
📌 RouterLink con Parámetros
Si necesitas pasar parámetros a la URL, usa parámetros dinámicos:

```typescript
const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
];
```
```html
<a [routerLink]="['/profile', userId]">Ver Perfil</a>
```
Si userId = 123, el enlace dirigirá a /profile/123.


📌 RouterLink con Query Params
Si quieres pasar parámetros en la URL como ?key=value, usa queryParams:
```html
<a [routerLink]="['/dashboard']" [queryParams]="{ page: 1, sort: 'desc' }">
  Ir al Dashboard con Query Params
</a>
```
¿Esto generará una URL como:
➡️ [/dashboard?page=1&sort=desc]()

desc

📌 Detectar la Ruta Activa con routerLinkActive
Puedes resaltar el enlace activo con routerLinkActive:

```html
<a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
```
```css
.active {
  font-weight: bold;
  color: blue;
}
```

Si necesitas navegar desde el TypeScript en lugar de un RouterLink, usa el Router de Angular:
```typescript
import { Router } from '@angular/router';
class example {
  router = inject(Router)
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
```
```html
<button (click)="goToDashboard()">Ir al Dashboard</button>
```

🎯 Resumen
+ Usa routerLink="/ruta" para navegar.
+ Usa [routerLink]="['/ruta', param]" para rutas con parámetros.
+ Usa [queryParams]="{ key: value }" para query params.
+ Usa routerLinkActive="clase" para resaltar la ruta activa.
+ Usa Router.navigate(['/ruta']) en TypeScript para navegación programática.
