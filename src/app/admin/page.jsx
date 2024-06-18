"use client";

import { useEffect, useState } from 'react';
import Club from '../components/Club';
import User from '../components/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('club'); // 'club' or 'user'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${view}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Fetched data:', result); // Debug log
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [view]);

  const handleSwitchRole = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'newRole' }), // Replace 'newRole' with the actual role you want to assign
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setData((prevData) =>
        prevData.map((user) =>
          user.id === id ? { ...user, role: 'newRole' } : user
        )
      );

      toast.success('User role switched successfully!');
    } catch (error) {
      console.error('Failed to switch role:', error);
      toast.error(`Failed to switch role: ${error.message}`);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setData((prevData) =>
        prevData.filter((user) => user.id !== id)
      );

      toast.success('User removed successfully!');
    } catch (error) {
      console.error('Failed to remove user:', error);
      toast.error(`Failed to remove user: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <ToastContainer />

      <div style={styles.buttonGroup}>
        <button onClick={() => setView('club')} style={view === 'club' ? styles.activeButton : styles.button}>View Clubs</button>
        <button onClick={() => setView('user')} style={view === 'user' ? styles.activeButton : styles.button}>View Users</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && view === 'club' && (
        <div style={styles.list}>
          {data.map((item) => (
            <Club
              key={item.id}
              id={item.id}
              name={item.name}
              banner={item.banner}
              description={item.description}
              isApproved={item.isApproved}
              onApprove={() => handleApprove(item.id, 'club')}
              onReject={() => handleReject(item.id, 'club')}
            />
          ))}
        </div>
      )}
      {!loading && !error && view === 'user' && (
        <div style={styles.list}>
          {data.map((user) => (
            <User
              key={user.id}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              onSwitchRole={() => handleSwitchRole(user.id)}
              onRemove={() => handleRemove(user.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    background: 'none',
  },
  activeButton: {
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    background: '#ccc',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};
