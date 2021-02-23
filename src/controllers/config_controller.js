import { Controller } from "stimulus"
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";

export default class extends Controller {

    static get targets() {
      return [ "config", "display", "button" ]
    }

    set() {

      if (this.configTarget.hidden) {
        if (window.firebaseUser) {
          alert("Sign out first!");
          return;
        }
        window.firebaseConfig = null;
        this.configTarget.hidden = false;
        this.displayTarget.innerHTML = "";
        this.buttonTarget.innerHTML = "Set config";
      }
      else {
        window.firebaseConfig = JSON.parse(this.configTarget.value);
        firebase.initializeApp(window.firebaseConfig);
        window.db = firebase.firestore()

        this.configTarget.hidden = true;
        this.displayTarget.innerHTML = this.configTarget.value;
        this.buttonTarget.innerHTML = "Change config";

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('g-recaptcha', {
          'size': 'normal',
          'callback': (response) => {
          }
        });

        window.recaptchaVerifier.render().then((widgetId) => {
          window.recaptchaWidgetId = widgetId;
        });
      }
    }
}