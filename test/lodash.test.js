import _ from 'lodash';
import { expect } from 'chai';


describe('lodash', () => {
  describe('.isEmpty', () => {
    it('when null', () => {
      expect(_.isEmpty(null)).to.equal(true);
    });

    it('when undefined', () => {
      expect(_.isEmpty()).to.equal(true);
      expect(_.isEmpty(undefined)).to.equal(true);
    });

    it('when empty string', () => {
      expect(_.isEmpty('')).to.equal(true);
    });
  });
});
