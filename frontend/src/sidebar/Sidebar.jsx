import { useState, useEffect } from 'react';
import {Link, useNavigate,  } from 'react-router-dom';
import userAvatar from '../assets/avatar.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';
import { handleLogout } from '../component/Auth/Signup/Signout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import handleProtectedNavigation from '../component/Auth/Signup/Auth';

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check auth status on component mount
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = async (path) => {
    const canNavigate = await handleProtectedNavigation(navigate, path);
    if (canNavigate) {
      navigate(path);
    }
    setIsOpen(false);
  };

  // Your existing styles remain the same
  const menuButtonStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1100,
    fontSize: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  };

  const sidebarStyle = {
    width: isOpen ? '250px' : '0',
    height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    overflowX: 'hidden',
    transition: 'width 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    padding: isOpen ? '20px' : '0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '16px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    opacity: isMobile ? (isOpen ? 1 : 0) : 1,
    transition: 'opacity 0.3s ease'
  };

  // handleSignInstle
   const handleSignIn = () => {
    console.log('Attempting navigation to /signup');
    navigate('/signup', { replace: false}); // replace: true prevents back navigation
  };
  // ... (keep all your other style definitions)

  return (
    <>
      <button onClick={toggleMenu} style={menuButtonStyle}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div style={sidebarStyle}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          width: '100%'
        }}>
          <img 
            src={user?.photoURL || userAvatar} 
            alt="User Avatar" 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%',
              opacity: isMobile ? (isOpen ? 1 : 0) : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
          <h2 style={{ 
            fontSize: '18px', 
            color: '#2c3e50', 
            margin: 0,
            opacity: isMobile ? (isOpen ? 1 : 0) : 1,
            transition: 'opacity 0.3s ease'
          }}>
            {user?.displayName || 'Guest'}
          </h2>
          <p style={{ 
            fontSize: '12px', 
            color: '#7f8c8d', 
            margin: 0,
            opacity: isMobile ? (isOpen ? 1 : 0) : 1,
            transition: 'opacity 0.3s ease'
          }}>
            {user ? 'Your Money' : 'Please sign in'}
          </p>

          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '30px',
            alignItems: 'flex-start',
            width: '100%',
            paddingLeft: '40px'
          }}>
            <button 
              onClick={() => handleNavigation('/dashboard')} 
              style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              📈 Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/transactions')} 
              style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              📄 View Transactions
            </button>
            <button 
              onClick={() => handleNavigation('/income')} 
              style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              💰 Incomes
            </button>
            <button 
              onClick={() => handleNavigation('/expense')} 
              style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              💸 Expenses
            </button>
          </nav>
        </div>

        <div style={{ 
          marginBottom: '70px',
          opacity: isMobile ? (isOpen ? 1 : 0) : 1,
          transition: 'opacity 0.3s ease'
        }}>
          {user ? (
            <button 
              style={{
                backgroundColor: '#e74c3c',
                border: 'none',
                padding: '10px 20px',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}  
              onClick={() => handleLogout(navigate)}
            >
              Sign Out
            </button>
          ) : (
            <button 
              style={{
                backgroundColor: '#2ecc71',
                border: 'none',
                padding: '10px 20px',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}  
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
}