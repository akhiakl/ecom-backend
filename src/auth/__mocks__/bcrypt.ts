// __mocks__/bcrypt.ts
const bcrypt = {
  hash: jest.fn((password: string, salt: number) =>
    Promise.resolve(`hashed-${password}`),
  ),
  compare: jest.fn((password: string, hash: string) =>
    Promise.resolve(password === hash.replace('hashed-', '')),
  ),
};

export default bcrypt;
