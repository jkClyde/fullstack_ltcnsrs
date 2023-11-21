// New component for displaying success or failure message
const MessagePopup = ({ successCount, failureCount }) => {
    const successStyle = {
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#DFF2BF',
      color: 'green',
    };
  
    const failureStyle = {
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FFBABA',
      color: 'red',
    };
  
    return (
      <div>
        {successCount > 0 && (
          <div style={successStyle}>
            {`Success: ${successCount} item${successCount !== 1 ? 's have been added to the database' : ''}.`}
          </div>
        )}
        {failureCount > 0 && (
          <div style={failureStyle}>
            {`Failed/Duplicate: ${failureCount} item${failureCount !== 1 ? 's' : ''}.`}
          </div>
        )}
      </div>
    );
  };
  

  export default MessagePopup;