import {Calendar} from "antd";
import {Event} from "../model/Event";
import {formatDate} from "../utils/formatDate";

type EventCalendarProps = {
    events: Event[],
    onSelect: (date: Date) => void
}

export const EventCalendar = ({events, onSelect}: EventCalendarProps) => {
    const cellRender = (date: Date) => {
        const formattedDate = formatDate(date);
        const currentUserEvents = events.filter((event) => event.date === formattedDate);

        return () => (
            <div className="EventCalendar__cell">
                {currentUserEvents.map((event, index) =>
                    <div key={index}>
                        {event.description}
                    </div>)}
            </div>
        );
    };

    return (
        <Calendar
            cellRender={(date) => cellRender(date.toDate())}
            onSelect={(date) => onSelect(date.toDate())}
        />
    );
};
