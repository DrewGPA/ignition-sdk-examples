/*
 **** Example of a custom calendar component for perspective
 */

import * as React from "react";
// import { CSSProperties } from "react";

import {
  Component,
  ComponentMeta,
  ComponentProps,
  SizeObject,
  PComponent
} from "@inductiveautomation/perspective-client";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import bind from 'bind-decorator';

// the 'key' or 'id' for this component type.  Component must be registered with this EXACT key in the Java side as well
// as on the client side.  In the client, this is done in the index file where we import and register through the
// ComponentRegistry provided by the perspective-client API.
export const COMPONENT_TYPE = "rad.display.atcalendar";

// this is the shape of the properties we get from the perspective 'props' property tree.
export interface ATCalendarProps {
  aspectRatio: string;
  events: Array<object>;
  startTime: string;
}

export class ATCalendar extends Component<
  ComponentProps<ATCalendarProps>,
  any
> {
  calendar: Calendar;

  render() {
    if (this.calendar != null) {
      this.calendar.setOption("events", this.props.read("events"));
      this.calendar.refetchEvents();
      // this.calendar.rerenderEvents();
    }
    return (
      // {/*<div style={myStyles}>*/}

      <div style="overflow-y: auto;" {...this.props.emit()}>
        <div {...this.props.emit()} id="calendar" />
      </div>
    );
  }

  componentDidMount() {
    let cal = this.calendar;
    let calendarEl: HTMLElement = document.getElementById("calendar")!;
    cal = new Calendar(calendarEl, {
      windowResize: function (view) {
        alert("The calendar has adjusted to a window resize");
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "dayGridMonth,timeGridWeek,timeGridDay",
        center: "title",
        right: "today, ,prev,next"
      },
      events: this.props.read("events"),
      selectable: true,
      firstDay: 1,
      weekNumbers: true,
      nowIndicator: true,
      height: "parent",
      contentHeight: "auto",
      initialView: "dayGridMonth",
      slotMinTime: "07:00:00",
      slotMaxTime: "19:00:00",
      select: function (info) {
        alert("selected " + info.startStr + " to " + info.endStr);

        let eventInfo = { start: info.start, end: info.end };

        if (!isNaN(info.start.valueOf())) {
          cal.addEvent(eventInfo, cal.getEventSources()[0]);
          alert("Great. Now, update your database...");
        } else {
          alert("Invalid date.");
        }
      }
    });

    cal.render();
  }
}

// this is the actual thing that gets registered with the component registry
export class ATCalendarMeta implements ComponentMeta {
  getComponentType(): string {
    return COMPONENT_TYPE;
  }

  // // the class or React Type that this component provides
  getViewComponent(): PComponent {
    return ATCalendar;
  }

  // the class or React Type that this component provides
  getViewClass(): React.ElementType {
    return ATCalendar;
  }

  getDefaultSize(): SizeObject {
    return {
      width: 360,
      height: 360
    };
  }
}
