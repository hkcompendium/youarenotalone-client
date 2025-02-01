import { observable, action, decorate } from "mobx";

class UIStore {
  sidebar = false;
  formatLayout = true;

  keywords = '';
  magistrate = '';
  from;
  to;
  setSidebar(value) {
    this.sidebar = value
  }
  setKeywords(v) {
    this.keywords = v;
  }
  setMagistrate(v) {
    this.magistrate = v;
  }
  setFrom(v) {
    this.form = v;
  }
  setTo(v) {
    this.to = v;
  }
  setFormatLayout(value) {
    this.formatLayout = value
  }

}
decorate(UIStore, {
  sidebar: observable,
  keywords: observable,
  magistrate: observable,
  formatLayout: observable,
  from: observable,
  to: observable,

  setFormatLayout: action,
  setSidebar: action,
  setKeywords: action,
  setMagistrate: action,
  setFrom: action,
  setTo: action,
})

export default UIStore;
