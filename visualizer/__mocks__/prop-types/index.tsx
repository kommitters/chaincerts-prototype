const propTypes = {
  arrayOf: jest.fn(() => {
    return { isRequired: jest.fn() };
  }),
  InferProps: jest.fn()
};

export default propTypes;
