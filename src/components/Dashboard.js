import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import { ReactTyped as Typed } from 'react-typed';
import styles from './Dashboard.module.css';

function Dashboard() {
	  const navigate = useNavigate();
	  const [user, setUser] = useState(null);

	  useEffect(() => {
		      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			            setUser(currentUser);
			          });

		      return () => unsubscribe();
		    }, []);

	  const handleSignOut = async () => {
		      try {
			            await signOut(auth);
			            alert('Signed out successfully!');
			            navigate('/');
			          } catch (error) {
					        alert(error.message);
					      }
		    };

	  return (
		      <div className={styles.dashboard}>
		        <div className={styles.header}>
		          <Typed
		            strings={['Welcome!']}
		            typeSpeed={70}
		            backSpeed={50}
		            loop={false}
		          />
		        </div>

		        {user && <TodoList user={user} />}

		        <button className={styles.signOutButton} onClick={handleSignOut}>
		          Sign Out
		        </button>
		      </div>
		    );
}

export default Dashboard;

