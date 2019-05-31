import { expect } from 'chai';

import Ckeditor from '../dist/index.umd';


describe('The DatePicker Component', () => {
  describe('component', () => {
    it('It should return a function', () => {
      expect(Ckeditor).to.satisfy(isFunction);

      function isFunction(args) {
        console.log(typeof args);
        return typeof args === 'function';
      }
    });
  });
});
