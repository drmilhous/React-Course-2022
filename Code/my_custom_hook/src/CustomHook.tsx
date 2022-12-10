import { useEffect } from "react";
import { useState } from "react";

function getSavedValue<T>(key: string, init: T) {
    let currentValue: T = init;
    if (localStorage.getItem(key) !== null) {
        let s = localStorage.getItem(key);
        if (s !== null) {
            currentValue = JSON.parse(s);
        }
    }
    return currentValue;
}

export function useLocalLocalStrage<T>(key: string, initalValue: T): 
[T, (arg: T) => void, (arg: T) => void] {
    const [value, setValue] = useState<T>(() => {
        return getSavedValue(key, initalValue);
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])
    function reset(value: T) {
        localStorage.removeItem(key);
        setValue(value);
    }
    return [value, setValue, reset];
}