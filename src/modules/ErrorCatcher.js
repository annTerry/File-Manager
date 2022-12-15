export default class ErrorCatcher {
  constructor(navigator) {
    this.navigator = navigator;
  }
  catchError(error) {
    console.log (error.message);
    console.log(this.navigator.showCurrent());
  }
}