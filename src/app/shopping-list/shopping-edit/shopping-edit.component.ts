import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", {static: true}) nameInputRef:ElementRef;
  @ViewChild("amountInput", {static: true}) amountInputRef:ElementRef;
  @Output() newShoppingItem: EventEmitter<{name:string, amount:number}> = new EventEmitter<{name:string,amount:number}>();
  
  constructor() { }

  ngOnInit(): void {
  }

  addToShoppingList() {
    this.newShoppingItem.emit({name:this.nameInputRef.nativeElement.value, amount:this.amountInputRef.nativeElement.value});
  }

}
