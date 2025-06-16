import { getAuth, signOut } from 'firebase/auth';

export const getToken = async () => {
  const user = getAuth().currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

export const handleLogout = async (navigate) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    navigate('/'); // Redirect to landing page
  } catch (error) {
    console.error('Error signing out:', error);
  }
};