// __mocks__/bcrypt.ts
const bcrypt = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hash: jest.fn((password: string, salt: number) =>
    Promise.resolve(`hashed-${password}`),
  ),
  compare: jest.fn((password: string, hash: string) =>
    Promise.resolve(password === hash.replace('hashed-', '')),
  ),
};

export default bcrypt;
