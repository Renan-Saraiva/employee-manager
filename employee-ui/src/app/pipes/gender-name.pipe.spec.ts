import { GenderNamePipe } from './gender-name.pipe';

describe('GenderNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GenderNamePipe();
    expect(pipe).toBeTruthy();
  });
});
