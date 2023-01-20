// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class SessionStorageMock {
  constructor() {
    this.store = {};
  }
  /* istanbul ignore next */
  clear() {
    this.store = {};
  }

  /* istanbul ignore next */
  getItem(key) {
    return this.store[key] || null;
  }

  /* istanbul ignore next */
  setItem(key, value) {
    this.store[key] = value.toString();
  }

  /* istanbul ignore next */
  removeItem(key) {
    delete this.store[key];
  }
};

global.sessionStorage = new SessionStorageMock;
