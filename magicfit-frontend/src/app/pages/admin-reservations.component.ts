import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Reservation } from 'src/app/modals/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AdminReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  form: FormGroup;
  edition = false;
  reservationEnCours: Reservation | null = null;

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['Cours Collectif', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerReservations();
  }

  chargerReservations(): void {
    this.reservationService.getAllReservations().subscribe({
    next: (data) => this.reservations = data,
    error: (err) => console.error('Erreur récupération réservations', err)
  });
}

  ajouterReservation(): void {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.edition && this.reservationEnCours?.id) {
      this.reservationService.updateReservation(this.reservationEnCours.id, data).subscribe(() => {
        this.annulerEdition();
        this.chargerReservations();
      });
    } else {
      this.reservationService.createReservation(data).subscribe(() => {
        this.form.reset();
        this.chargerReservations();
      });
    }
  }

  modifierReservation(r: Reservation): void {
    this.form.patchValue(r);
    this.reservationEnCours = r;
    this.edition = true;
  }

  supprimerReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe(() => this.chargerReservations());
  }

  annulerEdition(): void {
    this.form.reset();
    this.edition = false;
    this.reservationEnCours = null;
  }
}
