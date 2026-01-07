import {useState} from "react";
import {Button, Form, Input} from "antd";
import {rules} from "../utils/formRules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useAppDispatch";

export const LoginForm = () => {
    const {error, isLoading} = useTypedSelector(state => state.authReducer)
    const {login} = useActions();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onFinish = () => {
        login(username, password);
    }

    return (
        <Form onFinish={onFinish}>
            {error && <div style={{color: "red", paddingBottom: "10px"}}>
                {error}
            </div>}
            <Form.Item
                label="Логин"
                name="username"
                rules={[rules.required("Пожалуйста, введите логин")]}
            >
                <Input value={username} onChange={(evt) => setUsername(evt.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[rules.required("Пожалуйста, введите пароль")]}
            >
                <Input.Password value={password} onChange={(evt) => setPassword(evt.target.value)}/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}
