import type { EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

/** Needed because React.StrictMode re-renders application which in turn runs useEffect twice.
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
