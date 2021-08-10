// @ts-nocheck
import { createMocks } from 'node-mocks-http';
import handler from '@pages/api/subscribers';


describe('/api/stats',  () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  
    test('returns a message with the specified name', async () => {
      const { req, res } = createMocks({
        method: 'GET',
    });
      fetch.mockResponseOnce(JSON.stringify({count: 10} ));

      await handler(req, res);
      expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                count: 10,
            })
        );
    
      expect(fetch).toHaveBeenCalledTimes(1);
    });
});
