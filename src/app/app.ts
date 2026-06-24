import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { Footer } from "./core/footer/footer"; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router){}
}