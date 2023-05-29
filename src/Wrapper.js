import {AuthProvider} from "./Context/AuthContext";
import Router from "./Router";

export default () => {
    return (
        <AuthProvider>
            <Router/>
        </AuthProvider>
    )
}