import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import Axios from "axios"; // Import Axios

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  is_admin: false,
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

  const [refresher, setRefresher] = useState(1);

  const [is_admin, setIsAdmin] = useState(false); // Initialize is_admin state



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

  const fetchUserData = () => {
    const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
    // Replace with your actual API endpoint
    fetch('http://127.0.0.1:8000/auth/users/me/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedToken.data.access}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsAdmin(data.is_admin); // Set is_admin after user state is updated
        console.log(data.is_admin, "-----aaaaaaaaaaaaaaah")
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const [refreshToken, _setRefreshToken] = useState(() => {
    const storedRefreshToken = localStorage.getItem("REFRESH_TOKEN");
    return storedRefreshToken ? JSON.parse(storedRefreshToken) : null;
  });

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
    localStorage.removeItem("ACCESS_TOKEN")
    setToken(null); // Clear the token
    setRefresher(refresher + 1);
    
};


  


  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    try{
      fetchUserData();
    }catch{
      console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRROR");
    }
    
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
        activateUser,
        is_admin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
