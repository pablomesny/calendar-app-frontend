import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

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

  const onSelect = e => {
    // console.log({ click: e })
    setActiveEvent( e );
  }

  const onViewChanged = e => {
    localStorage.setItem( 'lastView', e );
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <Navbar />


      <Calendar
        culture="es"
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ openDateModal }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
    />

    <CalendarModal />
    <FabAddNew />
    <FabDelete />

    </>
  )
}
