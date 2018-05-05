import { Component, Input, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoadMenuItems } from '@app/modules/core/state/layout.actions';
import { LayoutState } from '@app/modules/core/state/layout.state';

@Component({
  moduleId: module.id,
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() open = false;
  @Select(LayoutState.table, 'variable_string') table$;
  
  ////////////////////////////////////////////////////////////////////
  ///// Uncaught TypeError: Cannot read property 'split' of null /////
  ////////////////////////////////////////////////////////////////////
  
  // @Select(LayoutState.table('something')) fields$; 
  // @Select(state => LayoutState.table2(state, 'something')) field2$;

  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(LoadMenuItems);
    this.table$.subscribe(a => console.log(a))   
    // this.fields$.subscribe(a => console.log(a))   
  }
}
