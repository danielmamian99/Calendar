import { useEffect } from "react";
import { useState } from "react";

import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";

import { localizer, getMessageES } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
 

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week");

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents(); 
  }, []);
  
  
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
      <FabDelete/>
    </>
  );
};
