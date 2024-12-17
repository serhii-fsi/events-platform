import axios from 'axios';

describe('Events API', () => {
  describe('GET /api/events', () => {
    // Helper function to call the endpoint with optional query parameters
    const getEvents = async (params = {}) => {
      return axios.get('/api/events', { params });
    };

    describe('happy path scenarios', () => {
      it('should return first page of events with default pagination', async () => {
        const response = await getEvents();
        expect(response.status).toBe(200);

        const { data, meta } = response.data;
        expect(Array.isArray(data.events)).toBe(true);
        expect(data.events.length).toBe(10); // default limit
        expect(meta.pagination.currentPage).toBe(1);
        expect(meta.pagination.totalPages).toBeGreaterThan(0);
      });

      it('should return events with custom pagination parameters', async () => {
        const response = await getEvents({ page: 2, limit: 5 });
        expect(response.status).toBe(200);

        const { data, meta } = response.data;
        expect(Array.isArray(data.events)).toBe(true);
        expect(data.events.length).toBe(5);
        expect(meta.pagination.currentPage).toBe(2);
      });

      it('should return correct event data structure', async () => {
        const response = await getEvents();
        expect(response.status).toBe(200);

        const event = response.data.data.events[0];
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('title');
        expect(event).toHaveProperty('startAt');
        expect(event).toHaveProperty('endAt');
        expect(event).toHaveProperty('location');
        expect(event).toHaveProperty('createdAt');
        expect(event).toHaveProperty('updatedAt');
      });
    });

    describe('error scenarios', () => {
      it('should return 400 when page parameter is invalid', async () => {
        const response = await getEvents({ page: -1 });
        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error');
      });

      it('should return 400 when limit parameter is invalid', async () => {
        const response = await getEvents({ limit: 101 });
        expect(response.status).toBe(400);
        expect(response.data).toHaveProperty('error');
      });
    });

    describe('pagination edge cases', () => {
      it('should return empty events array for page beyond total pages', async () => {
        const initialResponse = await getEvents();
        const totalPages = initialResponse.data.meta.pagination.totalPages;

        const response = await getEvents({ page: totalPages + 1 });
        expect(response.status).toBe(200);
        expect(response.data.data.events).toHaveLength(0);
      });
    });
  });
});
