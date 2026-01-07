import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/formRules";
import {IUser} from "../model/IUser";
import {FC, useState} from "react";
import {IEvent} from "../model/IEvent";
import {formatDate} from "../utils/formatDate";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    onSubmit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({guests, onSubmit}) => {
    const {user} = useTypedSelector(state => state.authReducer)
    const [event, setEvent] = useState({
        author: "",
        description: "",
        date: "",
        guest: {}
    } as IEvent)

    const onFinish = () => {
        onSubmit({...event, author: user.username});
    };

    return (
        <Form
            onFinish={onFinish}
        >
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
            >
                <Input onChange={(e) =>
                    setEvent({...event, description: e.target.value})
                }/>
            </Form.Item>
            <Form.Item
                label="Дата"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Событие не может быть создано в прошлом")]}
            >
                <DatePicker
                    onChange={(day) =>
                        setEvent({...event, date: formatDate(day?.toDate())})
                    }
                />
            </Form.Item>
            <Form.Item
                label="Гость"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(value) =>
                    setEvent({...event, guest: value})
                }>
                    {guests.map((guest) =>
                        <Select.Option key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;
