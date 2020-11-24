import { ApiClient } from '../src';

test('should create a client without error', () => {
  new ApiClient();
  new ApiClient({
    domain: 'public',
  });
});
