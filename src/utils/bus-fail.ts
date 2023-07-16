import { provide, inject, InjectionKey } from "vue";

// type Listener = (...argArray: any[]) =>void

interface EventBus {
  emit(event: string, ...args: any[]): void;
  on(event: string, listener: (...argArray: any[]) =>void): void;
  off(event: string, listener: (...argArray: any[]) =>void): void;
  listeners:{};
}

const EventBusKey: InjectionKey<EventBus> = Symbol();

function isValidKey(key:string, obj:{[propName:string]:any}):boolean{
  return key in obj;
}

export function provideEventBus() {
  const eventBus: EventBus = {
    emit: function (event: string, ...args: any[]): void {
      // this.listeners[event]?.forEach(listener: Listener => void) => listener(...args));
      if(isValidKey(event, this.listeners)){
        this.listeners[event]?.forEach(listener => listener(...args));
      }
    },
    on: function (event: string, listener: (...args: any[]) => void): void {
      // throw new Error("Function not implemented.");
      if(!this.listeners[event]){
        this.listeners[event] = []
      }
      this.listeners[event].push(listener)
    },
    off: function (event: string, listener: (...args: any[]) => void): void {
      if(isValidKey(event, this.listeners)){
        const index = this.listeners[event].indexof(listener);
        if(index !== -1){
          this.listeners[event].splice(index, 1)
        }
      }
    },
    listeners:{},
  };
  provide(EventBusKey, eventBus);
}

export function useEventBus():EventBus{
  const eventBus = inject(EventBusKey);
  if(!eventBus){
    throw new Error('EventBus not provided')
  }
  return eventBus;
}
