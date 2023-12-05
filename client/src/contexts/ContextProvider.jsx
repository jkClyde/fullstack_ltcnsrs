import { createContext, useContext, useState, useEffect  } from "react";
import Axios from "axios"; // Import Axios
import databaseURL from "../databaseURL";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  is_admin: false,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  logout: () => {}, // Add a logout function
  activateUser: () => {},
});

export const ContextProvider = ({ children }) => {
  //States -----------------------------------------------------
  const [refresher, setRefresher] = useState(1);
  const [is_admin, setIsAdmin] = useState(false); 
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    return storedToken ? JSON.parse(storedToken) : null;
  });
  const [notification, _setNotification] = useState("");
  const [refreshToken, _setRefreshToken] = useState(() => {
    const storedRefreshToken = localStorage.getItem("REFRESH_TOKEN");
    return storedRefreshToken ? JSON.parse(storedRefreshToken) : null;
  });

 //FunCtion -----------------------------------------------------

  //Token Manager
  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", JSON.stringify(token));
      localStorage.setItem("USER_DATA", JSON.stringify(user));
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_DATA");
    }
  };

  //Getting User Information || checking user roles
  const fetchUserData = () => {
    const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
    fetch(`${databaseURL}/auth/users/me/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedToken.data.access}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsAdmin(data.is_admin);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  //Setting Notications and Mesasges
  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };


// Activating Usrese
  const activateUser = async (uid, token) => {
    try {
      const response = await Axios.post(
        `${databaseURL}/auth/users/activation/`,
        { uid, token }
      );
  
      // Handle the response from the backend
      if (response.status === 200) {
        setNotification("User activated successfully.");
      } else {
        console.error("Activation failed:", response.statusText);
        setNotification("User activation failed.");
      }
    } catch (error) {
      console.error("Error activating user:", error);
      setNotification("Error activating user.");
    }
  };
  
//logout function
  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN")
    setToken(null); // Clear the token
    setRefresher(refresher + 1);
};


  

//USE EFFECTS -----------------------------------------------------------
  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    try{
      fetchUserData();
    }catch{
      console.log("Error : Failed fetching user data ");
    }
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      const storedUser = localStorage.getItem("USER_DATA");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  
  

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
        activateUser,
        is_admin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
