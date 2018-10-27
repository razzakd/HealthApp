import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenService } from './../Auth/auth.service';
import { User } from './../auth/user.model';


@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    providers: [AuthenService]
})

export class LoginComponent implements OnInit {
    model: User;
    username = '';
    password = '';
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenService
    ) { }

    ngOnInit() {
       // reset login status
       // this.authenticationService.logout();
       // get return url from route parameters or default to '/'
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authService.login(this.username, this.password);
    }
}
