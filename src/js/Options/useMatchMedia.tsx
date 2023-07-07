import { useState } from "react";

export function useMatchMedia(query: string): boolean {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    window.matchMedia(query).addEventListener("change", e => {
        setMatches(e.matches);
    });

    return matches;
}
