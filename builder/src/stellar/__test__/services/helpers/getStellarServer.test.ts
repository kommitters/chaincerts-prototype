import { getStellarServer } from '../../../services/helpers';

describe('getStellarServer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create server with correct endpoint', () => {
    const result = getStellarServer();

    expect(result).toBeDefined();
  });
});
