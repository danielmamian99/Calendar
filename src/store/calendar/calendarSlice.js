import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños del Jefe",
//   notes: "Hay que comprar pastel",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Daniel",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isloadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isloadingEvents = false;
      state.events = payload;
      payload.forEach((event) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isloadingEvents= true; 
      state.events= [];
      state.activeEvent= null;
    }
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
