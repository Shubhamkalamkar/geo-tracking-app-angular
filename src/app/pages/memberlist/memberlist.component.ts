import { Component } from '@angular/core';
import { Member } from './interfaces/member.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberlist',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.scss'
})
export class MemberlistComponent {

  constructor(private router:Router){}
  members = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'David Johnson' },
    { name: 'Emily Davis' },
  ];
  
  filteredMembers = this.members;
  searchText = '';

  onSearchChange() {
    this.filteredMembers = this.members.filter((member) =>
      member.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onAddClick() {
    console.log('Add button clicked');
    // Handle the action for when the "+" button is clicked
    this.router.navigate(['addnewmember'])
  }
}
