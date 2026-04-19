import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastComponent } from "../../shared/components/toast/toast.component/toast.component";

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, RouterLink, ToastComponent],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {

}
