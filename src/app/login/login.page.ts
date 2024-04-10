import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    if (this.username === 'user' && this.password === '123456') {
      this.router.navigate(['/home']);
    } else {
      // Show a snackbar
      const toast = await this.toastController.create({
        message: 'Incorrect username or password',
        duration: 2000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
    }
  }
}
