import chai from 'chai';
import model from '../../models';

const expect = chai.expect;
describe('Created MODELS:', () => {
  it('should have User Model Created', () => {
    expect(model.User).to.exist;
  });
  it('should have Role Model Created', () => {
    expect(model.Role).to.exist;
  });
  it('should have Document Model Created', () => {
    expect(model.Document).to.exist;
  });
});
