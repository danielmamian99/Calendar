import { useState } from "react";

import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from "date-fns";

import { Navbar, CalendarEvent, CalendarModal } from "../";
import { localizer, getMessageES } from "../../helpers";
 

const events = [{
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week")

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

  const onDobleClick = ( event ) => {
    console.log('onDobleClick >>>', event);
  } 

  const onSelect = ( event ) => {
    console.log('onSelect >>>', event);
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
    </>
  );
};
