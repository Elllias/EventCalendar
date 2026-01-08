import {Layout, Menu, Row} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useAppDispatch";

enum MenuKey {
    LOGOUT = "logout"
}

export const Navbar = () => {
    const {isAuth, user} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions();

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth &&
                    <>
                        <div className="Navbar__username">{user.username}</div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>
                            <Menu.Item
                                onClick={logout}
                                key={MenuKey.LOGOUT}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                }
            </Row>
        </Layout.Header>
    )
}
