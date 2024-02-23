import { create } from "zustand";
import Event from "../../app/events";

type Event = {
    isAdmin: boolean;
    event: Array<string>;
}

type EventState = {
    event: Event | null;
    setEvents: (events: Event) => void;
};

export const useEventStore = create<EventState>((set) => ({
    event: null,
    setEvents: (u) => set(() => ({ event: u })),
}));
