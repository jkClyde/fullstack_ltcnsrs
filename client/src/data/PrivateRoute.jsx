import { Route, Navigate  } from 'react-router-dom'
import { useContext } from 'react'



const PrivateRoute = ({children, ...rest}) => {
    // let {user} = useContext(AuthContext)
    const authenticated = false
    return(
        <Route {...rest}>{!authenticated ? <Navigate to="/login" /> :   children}</Route>
    )
}

export default PrivateRoute;