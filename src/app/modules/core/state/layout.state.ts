import { State, Action, StateContext, Selector } from '@ngxs/store';
import { OpenSidenav, CloseSidenav, LoadMenuItems } from './layout.actions';

export interface LayoutStateModel {
  showSidenav: boolean;
  menu: any;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { showSidenav: false, menu: [] }
})
export class LayoutState {
  @Selector()
  public static showSidenav(state: LayoutStateModel): boolean {
    return state.showSidenav;
  }

  @Action(OpenSidenav)
  openSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({ showSidenav: true });
  }

  @Action(CloseSidenav)
  closeSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({ showSidenav: false });
  }
  @Action(LoadMenuItems)
  loadMenuItems({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      // showSidenav: true,
      menu: [
        {
          nav: 'item 1'
        },
        {
          nav: 'item 2',
          sub_nav: {
            calendar: {
              type: 'home',
              priority: '3'
            },
            more_menu: 'item 7'
          }
        }
      ]
    });
  }

  @Selector()
  static table(myArg) {
    console.log(myArg); // <== Seems to call LayoutState
    // I'm expecting the 'variable_string' to be console.logged... 
    // not LayoutState ==> {showSidenav: false, menu: Array(2)}
  }

  @Selector()
  static table2(myArg, arg2) {
    console.log(myArg); // <== Seems to call LayoutState
    console.log(arg2); // <== logs undefined
  }
}
