import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Alert = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check if the 'props.alert' object is defined and has a 'type' property
    if (props.alert && props.alert.icon) {
      // You can customize the SweetAlert2 configuration here
      Swal.fire({
        icon: props.alert.icon, // 'success', 'error', 'warning', 'info', 'question', etc.
        text: props.alert.text,
        // timer: 9000, // Automatically close the alert after 3 seconds
      });

      // Show the alert by updating the state
      setShowAlert(true);
      console.log(props.alert.icon);
    }
  }, [props.alert]);
  

  return (
    <div>
      {showAlert && (
        <strong>{props.alert.icon}  &amp;&amp; {props.alert.text}</strong>      
      )}
    </div>
  );
};

export default Alert;
