export const incrementSequenceNumberFn = jest.fn().mockReturnValue(23134);

export class Account {
  incrementSequenceNumber = incrementSequenceNumberFn;
}
