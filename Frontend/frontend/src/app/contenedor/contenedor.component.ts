import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../models/user.model';

@Component({
	selector: 'app-contenedor',
	templateUrl: './contenedor.component.html',
	styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent implements OnInit {
	users: User[] = [
		{
			"id": 0,
			"nombre": "Alexandro Marcelo",
			"edad": 22
		},
		{
			"id": 1,
			"nombre": "Francisco Marcelo",
			"edad": 26
		},
		{
			"id": 2,
			"nombre": "Isabel González",
			"edad": 30
		},
		{
			"id": 3,
			"nombre": "Juan García",
			"edad": 42
		},
		{
			"id": 4,
			"nombre": "Ana Pérez",
			"edad": 13
		}
	];

	constructor() { }

	ngOnInit(): void {
	}

	/**
	 * Delete the user from the array, given his id
	 * @param {number} id user id
	 */
	handleDeleteUser(id: number) {
		// Find the user index in the array by the id and then delete him using splice
		const index = this.users.findIndex((user: User) => {
			return user.id === id
		});
		this.users.splice(index, 1);
	}
}
