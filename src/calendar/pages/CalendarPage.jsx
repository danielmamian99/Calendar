import { useState } from "react";

import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../";
import { localizer, getMessageES } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";
 

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week");

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDobleClick = () => {
    openDateModal()
  } 

  const onSelect = ( event ) => {
    setActiveEvent(event);
  }

  const onViewChange = ( event ) => {
    localStorage.setItem( 'lastView', event );
    setLastView( event )
  }
  
  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView= { lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages= { getMessageES() }
        eventPropGetter={ eventStyleGetter }
        components= {{
          event: CalendarEvent
        }}
        onDoubleClickEvent = { onDobleClick }
        onSelectEvent = { onSelect }
        onView = { onViewChange }

      />
      <CalendarModal/>
      <FabAddNew/>
    </>
  );
};
