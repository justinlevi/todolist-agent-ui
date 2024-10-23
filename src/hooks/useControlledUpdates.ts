import { useState, useEffect, useCallback } from "react";

export function useControlledUpdates<T>(updateInterval: number = 500) {
  const [state, setState] = useState<{ queue: T[]; currentItem: T | null }>({
    queue: [],
    currentItem: null,
  });

  const addToQueue = useCallback((item: T) => {
    setState((prevState) => ({
      ...prevState,
      queue: [...prevState.queue, item],
    }));
  }, []);

  const resetQueue = useCallback(() => {
    setState({ queue: [], currentItem: null });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState((prevState) => {
        if (prevState.queue.length > 0) {
          const [nextItem, ...rest] = prevState.queue;
          return {
            queue: rest,
            currentItem: nextItem,
          };
        }
        return prevState;
      });
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  return { addToQueue, currentItem: state.currentItem, resetQueue };
}
