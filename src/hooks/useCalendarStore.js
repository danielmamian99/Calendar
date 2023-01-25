import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
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
        try {

            if(calendarEvent.id){
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent( { ...calendarEvent, user } ) );
                return;
    
            }
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
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
            dispatch( onLoadEvents(  events ) ); 
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