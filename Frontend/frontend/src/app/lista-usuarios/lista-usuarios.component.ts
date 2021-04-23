import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../models/user.model';

@Component({
	selector: 'app-lista-usuarios',
	templateUrl: './lista-usuarios.component.html',
	styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

	@Input() users: User[] = [];
	@Output() clickDeleteUser: EventEmitter<number> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	/**
	 * Delete the user given the id, by emmiting to the parent to delete the user
	 * @param id user id
	 */
	deleteUser(id: number) {
		this.clickDeleteUser.emit(id);
	}
}
