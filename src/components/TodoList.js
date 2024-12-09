import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './TodoList.module.css';

const TodoList = ({ user }) => {
	  const [todos, setTodos] = useState([]);
	  const [newTodo, setNewTodo] = useState('');
	  const navigate = useNavigate(); // Initialize navigate

	  useEffect(() => {
		      const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
		      const unsubscribe = onSnapshot(q, (snapshot) => {
			            const todosData = snapshot.docs.map((doc) => ({
					            id: doc.id,
					            ...doc.data(),
					          }));
			            setTodos(todosData);
			          });

		      return () => unsubscribe();
		    }, [user]);

	  const handleAddTodo = async () => {
		      if (newTodo.trim()) {
			            await addDoc(collection(db, 'todos'), {
					            text: newTodo,
					            userId: user.uid,
					            completed: false,
					          });
			            setNewTodo('');
			          }
		    };

	  const toggleComplete = async (todo) => {
		      await updateDoc(doc(db, 'todos', todo.id), {
			            completed: !todo.completed,
			          });
		    };

	  const handleDelete = async (id) => {
		      await deleteDoc(doc(db, 'todos', id));
		    };

	  const handleLogout = async () => {
		      try {
			            await signOut(auth);
			            navigate('/'); // Redirect to the default route after logout
			          } catch (error) {
					        console.error('Error signing out:', error);
					      }
		    };

	return (
		    <div className={styles.container}>
		      <div className={styles.header}>
		        <h2>Todo List</h2>
		        <Button variant="outlined" color="secondary" onClick={handleLogout}>
		          Logout
		        </Button>
		      </div>

		      <div className={styles.inputWrapper}>
		        <TextField
		          label="Add a new todo"
		          variant="outlined"
		          value={newTodo}
		          onChange={(e) => setNewTodo(e.target.value)}
		          fullWidth
		        />
		        <Button variant="contained" color="primary" onClick={handleAddTodo}>
		          Add
		        </Button>
		      </div>

		      <List className={styles.todoList}>
		        {todos.map((todo) => (
				          <ListItem
				            key={todo.id}
				            className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
				            secondaryAction={
						                  <div className={styles.buttons}>
						                    <Checkbox
						                      edge="start"
						                      checked={todo.completed}
						                      onChange={() => toggleComplete(todo)}
						                    />
						                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
						                      <DeleteIcon />
						                    </IconButton>
						                  </div>
						                }
				          >
				            <ListItemText primary={todo.text} />
				          </ListItem>
				        ))}
		      </List>
		    </div>
		  );
};

export default TodoList;
