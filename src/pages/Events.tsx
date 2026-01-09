import {useEffect, useRef, useState} from "react";
import {Button, Card, Layout, Modal, Row} from "antd";
import {EventCalendar} from "../components/EventCalendar";
import {EventCreateForm} from "../components/EventCreateForm";
import {EventInfoForm} from "../components/EventInfoForm";
import {useActions} from "../hooks/useAppDispatch";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Event} from "../model/Event";
import {formatDate} from "../utils/formatDate";

export const Events = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const {guests, events} = useTypedSelector(state => state.eventReducer);
    const {user} = useTypedSelector(state => state.authReducer);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const selectedDate = useRef<Date>(undefined);

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, []);

    const onSubmit = (event: Event) => {
        setIsCreateModalOpen(false);
        createEvent(event);
    }

    return (
        <Layout>
            <Card>
                <EventCalendar events={events} onSelect={(date) => {
                    selectedDate.current = date;
                    setIsInfoModalOpen(true);
                }}/>
            </Card>
            <Row justify="center" className="Event__add-event-row">
                <Button onClick={() =>
                    setIsCreateModalOpen(true)
                }>
                    Добавить событие
                </Button>
            </Row>
            <Modal
                title="Добавить событие"
                open={isCreateModalOpen}
                onCancel={() => setIsCreateModalOpen(false)}
                footer={null}
            >
                <EventCreateForm guests={guests} onSubmit={onSubmit}/>
            </Modal>
            <Modal
                title="События"
                open={isInfoModalOpen}
                onCancel={() => setIsInfoModalOpen(false)}
                footer={null}
            >
                <EventInfoForm events={events.filter(
                    (event) => event.date === formatDate(selectedDate.current)
                )}/>
            </Modal>
        </Layout>
    );
};
