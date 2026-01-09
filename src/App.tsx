import {Layout} from "antd";
import {useEffect} from "react";
import {useActions} from "./hooks/useAppDispatch";
import {User} from "./model/User";
import {Navbar} from "./components/Navbar";
import {AppRouter} from "./components/AppRouter";
import {UserService} from "./api/UserService";

function App() {
    const {setUser, setAuth} = useActions();

    useEffect(() => {
        if (UserService.getAuth()) {
            setAuth(true);
            setUser({username: UserService.getUsername()} as User);
        }
    }, [])

    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>
        </Layout>
    );
}

export default App;
