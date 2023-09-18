import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

/** Needed because React.StrictMode in latest React version re-renders application, which in turn runs useEffect twice.
 *  This is a new behaviour that is supposed to make debugging easier, but it introduces this effect.
 *  Hopefully this will be changed in the next versions, so far this is a preferred way of handling it.
 *  As seen here: https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7
 */
export function useOnMountUnsafe(effect: EffectCallback) {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            effect();
        }
    }, []);
}
