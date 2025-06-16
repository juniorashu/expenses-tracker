import { getAuth } from 'firebase/auth';

export const getToken = async () => {
  const user = getAuth().currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

export const checkAuth = async () => {
  const token = await getToken();
  if (!token) {
    // Handle redirect to login or show error
    throw new Error('Not authenticated');
  }
  return token;
};