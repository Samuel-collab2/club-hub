import React from 'react';

export default function Club({ id, name, banner, description, isApproved, onApprove, onReject }) {
  return (
    <div style={styles.clubContainer}>
      <img src={banner} alt={`${name} banner`} style={styles.image} />
      <div style={styles.info}>
        <h2 style={styles.title}>{name}</h2>
        <p style={styles.description}>{description}</p>
      </div>
      <div style={styles.buttonsContainer}>
        {!isApproved && (
          <button
            style={{ ...styles.button, ...styles.greenButton }}
            onClick={() => onApprove(id)}
          >
            Approve
          </button>
        )}
        <button
          style={{ ...styles.button, ...styles.redButton }}
          onClick={() => onReject(id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

const styles = {
  clubContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    flexWrap: 'wrap',
  },
  image: {
    width: '150px',
    height: 'auto',
    marginRight: '20px',
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
  description: {
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
