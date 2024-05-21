// Importing Components
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
// Importing React Hooks
import React, { useState, useEffect } from 'react';
// Importing Packages
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Button from "./components/Button";

function App() {
  // All States
  const [loading, setLoading] = useState(true); // Pre-loader before page renders
  const [tasks, setTasks] = useState([]); // Task State
  const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form
  const [theme, changeTheme] = useState(false); // Change theme
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  let role = "";

  // Pre-loader
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, [])

  // Fetching from Local Storage
  const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

  useEffect(() => {
    if (getTasks == null) {
      setTasks([])
    } else {
      setTasks(getTasks);
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Response:', response); // Add this line
      const receivedToken = response.data.token;
      setToken(receivedToken);
      let role2 = jwtDecode(receivedToken);
      role = role2.role;
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('role', role);
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error in setting up request:', error.message);
      }
    }
  };
  // Add Task
  const addTask = (task) => {
    const id = uuidv4();
    const newTask = { id, ...task }

    setTasks([...tasks, newTask]);

    Swal.fire({
      icon: 'success',
      title: 'Yay...',
      text: 'You have successfully added a new task!'
    })

    localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
  }

  // Delete Task
  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTasks(deleteTask);

    Swal.fire({
      icon: 'success',
      title: 'Oops...',
      text: 'You have successfully deleted a task!'
    })

    localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
  }

  // Edit Task
  const editTask = (id) => {

    const text = prompt("Book name");
    const day = prompt("Author");
    const category = prompt("Category");
    let data = JSON.parse(localStorage.getItem('taskAdded'));


    const myData = data.map(x => {
      if (x.id === id) {
        return {
          ...x,
          text: text,
          day: day,
          category: category,
          id: uuidv4()
        }
      }
      return x;
    })

    Swal.fire({
      icon: 'success',
      title: 'Yay...',
      text: 'You have successfully edited an existing task!'
    })

    localStorage.setItem("taskAdded", JSON.stringify(myData));
    window.location.reload();
  }

  return (
      <>
        <div>
          {!token && (
              <div className="loginBlock">
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} text={"Login"} theme={theme}/>
              </div>
          )}
          {token && (
              <div>
                {
                  loading
                      ?
                      <div className="spinnerContainer">
                        <div className="spinner-grow text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      :
                      <div className={` ${theme ? 'backgroundDark' : 'background'}`}>
                        <div className="container">
                          {/* App Header that has open and App Name */}
                          <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} toggleTheme={() => changeTheme(!theme)} theme={theme} />
                          {showAddTask && <AddTask onSave={addTask} theme={theme} />}

                          {/* Task Counter */}
                          <h3>Number of Books: {tasks.length}</h3>

                          {/* Displaying of Tasks */}
                          {
                            tasks.length > 0
                                ?
                                (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} theme={theme} />)
                                :
                                ('No Books!')
                          }
                        </div>
                      </div>

                }
              </div>
          )}
        </div>
      </>
  )
}

export default App;