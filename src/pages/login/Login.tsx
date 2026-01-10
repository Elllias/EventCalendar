import "./Login.css";
import {Card, Layout, Row} from "antd";
import "../../App.css"
import {LoginForm} from "../../components/login-form/LoginForm";

export const Login = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="Login__row">
                <Card>
                    <LoginForm/>
                </Card>
            </Row>
        </Layout>
    );
};
