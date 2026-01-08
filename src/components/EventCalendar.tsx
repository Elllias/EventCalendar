import {Calendar} from "antd";
import {IEvent} from "../model/IEvent";
import {formatDate} from "../utils/formatDate";

interface EventCalendarProps {
    events: IEvent[],
    onSelect: (date: Date) => void
}

const EventCalendar = ({events, onSelect}: EventCalendarProps) => {
    const cellRender = (date: Date) => {
        const formatedDate: string = formatDate(date);
        const currentUserEvents: IEvent[] = events.filter((event) => event.date === formatedDate);

        return (
            <div className="event-calendar-cell">{currentUserEvents.map((event, index) =>
                <div key={index}>{event.description}</div>)}
            </div>
        );
    };

    return (
        <Calendar
            cellRender={(date, info) => cellRender(date.toDate())}
            onSelect={(date) => onSelect(date.toDate())}
        />
    );
};

export default EventCalendar;
