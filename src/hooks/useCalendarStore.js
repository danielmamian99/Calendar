import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { convertsEventsToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () =>{

    const dispatch  = useDispatch();

    const { events, activeEvent } =  useSelector(state => state.calendar);
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = (calendarEvent) => {
        dispatch ( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO llegar al backend

        //TODO todo bien
        if(calendarEvent.id){
            // Actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) )
        }else{
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) )
        }
    }

    const startDeletingEvent = async() => {
        //TODO llegar al backend
        await dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events');
            const events = convertsEventsToDate( data.events );
            dispatch( onLoadEvents(events) ); 
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //*Metodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}