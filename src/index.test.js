import { expect } from 'chai';

import Ckeditor from '../dist/index.umd';

describe('Ckeditor Component', function() {
  describe('component', function() {
    it('It should return a function', function() {
      expect(Ckeditor).to.satisfy(isFunction);

      function isFunction(args) {
        console.log(typeof args);
        return typeof args === 'function';
      }
    });
  });
});
