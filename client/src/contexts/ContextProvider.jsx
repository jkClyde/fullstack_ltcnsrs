import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import Axios from "axios"; // Import Axios

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  logout: () => {}, // Add a logout function
  fetchEvents: () => {},
  activateUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [notification, _setNotification] = useState("");
  let [loading, setLoading] = useState(true);

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
      // Store user-related data in local storage
      localStorage.setItem("USER_DATA", JSON.stringify(user));
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      // Remove user-related data from local storage when logging out
      localStorage.removeItem("USER_DATA");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const activateUser = async (uid, token) => {
    try {
      // Send a POST request to your activation endpoint with the UID and token
      const response = await Axios.post(
        `http://127.0.0.1:8000/auth/users/activation/`,
        { uid, token }
      );
  
      // Handle the response from the backend
      if (response.status === 200) {
        // User activated successfully
        setNotification("User activated successfully.");
        // Optionally, you can perform additional actions after successful activation
      } else {
        // Handle other response statuses as needed
        console.error("Activation failed:", response.statusText);
        setNotification("User activation failed.");
      }
    } catch (error) {
      console.error("Error activating user:", error);
      setNotification("Error activating user.");
    }
  };
  


  
  const logout = () => {
    setToken(null); // Clear the token
    setUser({}); // Clear any user-related data (you can customize this as needed)
    // Additional logout logic can go here, such as making an API request to invalidate the token on the server
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      console.log("Token retrieved:", JSON.parse(storedToken));
      setToken(JSON.parse(storedToken));
      const storedUser = localStorage.getItem("USER_DATA");
      if (storedUser) {
        console.log("User data retrieved:", JSON.parse(storedUser));
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  
  

  const fetchEvents = (setCurrentEvents) => {
    if (!token) {
      // Handle the case where the user is not authenticated or the token is missing
      console.error("User is not authenticated. Handle accordingly.");
      return;
    }
  
    Axios
      .get('http://127.0.0.1:8000/api/events/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const events = response.data;
          setCurrentEvents(events);
        } else if (response.status === 401) {
          // Handle unauthorized response (e.g., log out the user or redirect to login)
          console.error("User is not authorized. Handle accordingly.");
        } else {
          // Handle other response statuses as needed
          console.error("Other error occurred:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
        logout,
        fetchEvents,
        activateUser
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
