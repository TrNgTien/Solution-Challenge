import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// needed for IE11
(function CustomEventPolyfill() {
  if (typeof window.Event === 'function') return false; // If not IE

  function CustomEvent(event, params) {
    // eslint-disable-next-line
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined,
    };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.Event = CustomEvent;
})();
