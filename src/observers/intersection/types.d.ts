import type Observer from './Observer';

export type IntersectionHandler = (visible: boolean, entry: IntersectionObserverEntry) => void;

export interface IntersectionOption extends IntersectionObserverInit {
  handler: IntersectionHandler;
}

export type IntersectionOptionHandler = IntersectionHandler | IntersectionOption | Observer;
