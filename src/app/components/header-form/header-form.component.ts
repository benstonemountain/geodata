import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrl: './header-form.component.css'
})

export class HeaderFormComponent {



  constructor(	private formBuilder: FormBuilder,) {}

  searchForm = this.formBuilder.group({
		search: [''],
	});

 @Output() onEmitCityName = new EventEmitter<string>;

  onCitySearch() {
		const userInput = this.searchForm.value.search;
		console.log(userInput);
    if (userInput) 
    this.onEmitCityName.emit(userInput);
  	
	}

}
