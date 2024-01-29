import { StateCreator } from 'zustand';

export interface DateSlice {
  eventDate: Date; //number, string, primitive
  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
  setEventDate: (partialDate: string) => void;
  setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),
  eventYYYYMMDD: () => {
    const date = get().eventDate;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
  },
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, '0');
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  setEventDate: (partialDate: string) =>
    set((state) => {
      const date = new Date(partialDate);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
      const year = date.getFullYear();
      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, +month - 1, +day);
      return { eventDate: newDate };
    }),
  setEventTime: (eventTime: string) =>
    set((state) => {
      const hours = parseInt(eventTime.split(':')[0]);
      const minutes = parseInt(eventTime.split(':')[1]);
      const newDate = new Date(state.eventDate);
      newDate.setHours(hours, minutes);
      return { eventDate: newDate };
    }),
});
