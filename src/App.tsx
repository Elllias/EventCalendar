import {Layout} from "antd";
import {useEffect} from "react";
import {useActions} from "./hooks/useAppDispatch";
import {IUser} from "./model/IUser";
import {Navbar} from "./components/Navbar";
import AppRouter from "./components/AppRouter";

function App() {
    const {setUser, setAuth} = useActions();

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setAuth(true);
            setUser({username: localStorage.getItem("username")} as IUser);
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
