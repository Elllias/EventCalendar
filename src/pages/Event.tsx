import {useEffect, useState} from "react";
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useAppDispatch";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../model/IEvent";

const Event = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {guests, events} = useTypedSelector(state => state.eventReducer);
    const {user} = useTypedSelector(state => state.authReducer);
    const {fetchGuests, createEvent, fetchEvents} = useActions();

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, []);

    const onSubmit = (event: IEvent) => {
        setIsModalOpen(false);
        createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center" style={{padding: "10px 0"}}>
                <Button onClick={() =>
                    setIsModalOpen(true)
                }>
                    Добавить событие
                </Button>
            </Row>
            <Modal
                title="Добавить событие"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <EventForm guests={guests} onSubmit={onSubmit}/>
            </Modal>
        </Layout>
    );
};

export default Event;