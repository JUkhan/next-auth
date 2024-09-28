import { setState, dispatch, select, type AppState } from '@/app/appState';

export default {
    decrement() {
        const counter = select(state => state.counter);
        counter.count--;
        setState({ counter });
    },

    increment(by: number) {
        return () => {
            const counter = select(state => state.counter);
            counter.count += by;
            setState({ counter });
            dispatch({ type: 'by', val: by });
        }
    },

    asyncInc() {
        setState(state => ({ counter: { ...state.counter, loading: true } }));
        setTimeout(() => {
            setState(state => ({ counter: { count: state.counter.count + 1, loading: false } }));
        }, 1000);
    },
    counterSelector: (sate: AppState) => sate.counter
}