import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {useState} from "react";
import {rules} from "../utils/formRules";
import {formatDate} from "../utils/formatDate";
import {IUser} from "../model/IUser";
import {IEvent} from "../model/IEvent";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    onSubmit: (event: IEvent) => void
}

const EventCreateForm = ({guests, onSubmit}: EventFormProps) => {
    const {user} = useTypedSelector(state => state.authReducer);
    const [event, setEvent] = useState<IEvent>({
        author: "",
        description: "",
        date: "",
        guest: ""
    });

    const onFinish = () => {
        onSubmit({...event, author: user.username});
    };

    return (
        <Form
            onFinish={onFinish}
        >
            <Form.Item
                label="Описание"
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
                rules={[rules.required(), rules.isDateAfter("Событие может создано только на актуальные даты")]}
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
                        guest.username !== user.username &&
                        <Select.Option key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventCreateForm;
