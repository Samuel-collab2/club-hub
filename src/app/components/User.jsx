import React from 'react';

export default function User({ id, firstName, lastName, email, onSwitchRole, onRemove }) {
  return (
    <div style={styles.userContainer}>
      <div style={styles.info}>
        <h2 style={styles.title}>{`${firstName} ${lastName}`}</h2>
        <p style={styles.email}>{email}</p>
      </div>
      <div style={styles.buttonsContainer}>
        <button style={{ ...styles.button, ...styles.greenButton }} onClick={() => onSwitchRole(id)}>Switch Role</button>
        <button style={{ ...styles.button, ...styles.redButton }} onClick={() => onRemove(id)}>Remove</button>
      </div>
    </div>
  );
}

const styles = {
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    flexWrap: 'wrap',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '200px',
  },
  title: {
    margin: '0 0 10px 0',
  },
  email: {
    margin: '0',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    minWidth: '100px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  greenButton: {
    backgroundColor: 'green',
    color: 'white',
  },
  redButton: {
    backgroundColor: 'red',
    color: 'white',
  },
};
