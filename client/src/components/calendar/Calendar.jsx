import React, {useEffect, useState} from 'react';
import FullCalendar,{ formatDate } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import moment from "moment";


const Calendar = ({data}) => {





  const [currentEvents, setCurrentEvents] = useState(data?.map(item => ({
    title: item?.content,
    start: moment(new Date(item?.fromDate)).toDate(),
    end: moment(new Date(item?.toDate)).toDate(),
  })) || []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  useEffect(() => {
    console.log(currentEvents,"event")
  },[currentEvents])


  // useEffect(() => {
  //   console.log(data,"data show")
  //   setCurrentEvents(data?.map(item => ({
  //     title: item?.content,
  //     start: moment(new Date(item?.fromDate)),
  //     end: moment(new Date(item?.toDate)),
  //   })))
  // },[])

  return (
    <FullCalendar
      height="75vh"
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
      ]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      }}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleDateClick}
      eventClick={handleEventClick}
      eventsSet={(events) => setCurrentEvents(events)}
      // events={currentEvents}
      initialEvents={currentEvents}
    />
  );
};

export default Calendar;