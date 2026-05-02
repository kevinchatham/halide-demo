import { Component, inject, signal } from '@angular/core';
import { FormField, form, submit, validateStandardSchema } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { type LoginRequest, LoginSchema } from 'shared';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [FormField],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly model = signal<LoginRequest>({ password: '', username: '' });
  readonly error = signal<string | null>(null);

  readonly loginForm = form(this.model, (schemaPath) => {
    validateStandardSchema(schemaPath, LoginSchema);
  });

  async onSubmit(): Promise<void> {
    this.error.set(null);

    await submit(this.loginForm, async (field) => {
      const result = await this.authService.login(
        field().value().username,
        field().value().password,
      );
      if (!result) {
        return { kind: 'serverError', message: 'Invalid username or password' };
      }
      await this.router.navigate(['/users']);
      return undefined;
    });
  }
}
