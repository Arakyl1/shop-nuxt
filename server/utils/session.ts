import { v4 as uuidv4 } from 'uuid';

export const generateSessionId = () => {
  const sessionId = uuidv4();
  return sessionId;
};
