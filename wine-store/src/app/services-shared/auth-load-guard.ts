import { Injectable } from '@angular/core';
import { Router, CanLoad,  } from '@angular/router';
import { AuthenticationService } from '../pages/authentication/services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthLoadGuard implements CanLoad {
    user: any = null;

    constructor(
        private router: Router,
        private _authService: AuthenticationService
    ) { 
        this._authService.userData$.subscribe(success => {
            this.user = success;
        })
    }

    canLoad() {
		const user = this._authService.userData$;
            
            if (user) {
                return true;
            } else {
                // not logged in so redirect to login page with the return url
                this.router.navigateByUrl('auth');
                return false;
            }
	}
}