import { toJS, observable, computed, action, decorate } from "mobx";
import _ from 'lodash';



const initialViewer = {
  id: null,
  name: null,
  type: null,
  username: null,
  email: null,
};

class AuthStore {
  viewer = { ...initialViewer };
  globalEditMode = false;

  get token() {
    return '';
  }
  get canTurnOnEdit() {
    return this.viewer.type === 'ADMIN' || this.viewer.type === 'EDITOR';
  }
  get canEdit() {
    return (this.globalEditMode) && (this.viewer.type === 'ADMIN' || this.viewer.type === 'EDITOR');
  }
  get canView() {
    return !!this.viewer.type;
  }
  get canInvite() {
    return this.viewer.type === 'ADMIN' || this.viewer.type === 'EDITOR';
  }
  setEditMode(v) {
  }
  setViewer(viewer) {
    this.viewer = { ...initialViewer };
  }
  login(viewer, token) {
  }
  logout() {
  }
}
decorate(AuthStore, {
  token: computed,
  canEdit: computed,
  canTurnOnEdit: computed,
  cookie: observable,
  viewer: observable,
  globalEditMode: observable,
  setEditMode: action,
  setViewer: action,
  login: action,
  logout: action,
})


export default AuthStore;
