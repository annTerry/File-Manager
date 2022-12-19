export default class ErrorCatcher {
  constructor(navigator) {
    this.navigator = navigator;
  }
  catchError(error) {
    if (error.message) console.log (error.message);
    console.log(this.navigator.showCurrent());
  }
}