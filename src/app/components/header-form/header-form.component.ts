import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeoStateService } from '../../services/geo-state.service';

@Component({
	selector: 'app-header-form',
	templateUrl: './header-form.component.html',
	styleUrl: './header-form.component.css',
})
export class HeaderFormComponent {
	constructor(
		private formBuilder: FormBuilder,
		private geoStateService: GeoStateService,
	) {}

	searchForm = this.formBuilder.group({
		search: [''],
	});

	@Output() onEmitCityName = new EventEmitter<string>();
  @Output() onEmitError = new EventEmitter<boolean>;

	onCitySearch() {
		const userInput = this.searchForm.value.search ?? '';

		const onlyWhiteSpaces = userInput === '' || /^\s+$/.test(userInput);
		console.log(onlyWhiteSpaces);

		if (onlyWhiteSpaces) {
			this.onEmitError.emit(true);
		} else {
			this.onEmitCityName.emit(userInput);
		}
	}
}
