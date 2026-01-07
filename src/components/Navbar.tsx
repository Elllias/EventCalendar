import {useState} from "react";
import {Layout, Menu, Row} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useAppDispatch";

enum MenuKey {
    LOGIN = "login",
    LOGOUT = "logout",
    EVENT = "event"
}

export const Navbar = () => {
    const [selectedKey, setSelectedKey] = useState(MenuKey.LOGIN);
    const {isAuth, user} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                    <>
                        <div style={{color: "white", paddingRight: "10px"}}>{user.username}</div>
                        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} selectable={false}>
                            <Menu.Item
                                onClick={logout}
                                key={MenuKey.LOGOUT}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} selectable={false}>
                        <Menu.Item
                            onClick={() => {
                                setSelectedKey(MenuKey.LOGIN)
                            }}
                            key={MenuKey.LOGIN}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    )
}
