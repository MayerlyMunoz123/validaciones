import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mayform';
  loginForm: FormGroup = new FormGroup({});
  UserData: Usuario = {
    cedula: '',
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    numeroDeTelefono: 0,
  };
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],                                           
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroDeTelefono: ['', [Validators.required, Validators.minLength(10)]]
    });
  } onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value);
    } else {
      let mensaje = 'Por favor revise los siguientes campos:';
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control && control.invalid) {
          if (control.errors?.['required']) {
            mensaje += `\n- El campo ${key} es obligatorio.`;
          } else if (control.errors?.['email']) {
            mensaje += `\n- El campo ${key} debe ser una dirección de correo electrónico válida.`;
          } else if (key === 'numeroDeTelefono' && control.value && !/^\d{10}$/.test(control.value)) {
            mensaje += `\n- El campo ${key} debe contener exactamente 10 números.`;
          }
        }
      });
      alert(mensaje);
      console.log('Formulario inválido');
    }
  }



}
