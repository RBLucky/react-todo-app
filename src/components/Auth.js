import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

function Auth() {
	  const [email, setEmail] = useState('');
	  const [password, setPassword] = useState('');
	  const navigate = useNavigate();

	  const handleSignIn = async () => {
		      try {
			            await signInWithEmailAndPassword(auth, email, password);
			            alert('Signed in successfully!');
			            navigate('/dashboard');
			          } catch (error) {
					        alert(error.message);
					      }
		    };

	  const handleSignUp = async () => {
		      try {
			            await createUserWithEmailAndPassword(auth, email, password);
			            alert('Account created successfully!');
			            navigate('/dashboard');
			          } catch (error) {
					        alert(error.message);
					      }
		    };

	  return (
		      <div className={styles.authContainer}>
		        <div className={styles.authCard}>
		          <h2 className={styles.title}>Welcome Back!</h2>
		          <p className={styles.subtitle}>Sign in or create an account</p>
		          <div className={styles.inputGroup}>
		            <input
		              type="email"
		              placeholder="Email"
		              value={email}
		              onChange={(e) => setEmail(e.target.value)}
		              className={styles.input}
		            />
		            <input
		              type="password"
		              placeholder="Password"
		              value={password}
		              onChange={(e) => setPassword(e.target.value)}
		              className={styles.input}
		            />
		          </div>
		          <div className={styles.buttonGroup}>
		            <button onClick={handleSignIn} className={styles.buttonPrimary}>
		              Sign In
		            </button>
		            <button onClick={handleSignUp} className={styles.buttonSecondary}>
		              Sign Up
		            </button>
		          </div>
		        </div>
		      </div>
		    );
}

export default Auth;
