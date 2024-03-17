'use client'

import { useEffect, useState } from 'react'

export default function useMediaQuery(minWidth: number) {
    const [queryMatches, setQueryMatches] = useState(false)
    // tailwind breakpoints: {
    //     sm: "640px",
    //     md: "768px",
    //     lg: "1024px",
    //     xl: "1280px",
    //   }
    useEffect(() => {
        const handleResize = () => {
            setQueryMatches(window.innerWidth >= minWidth)
        }
        // on initial render determine screen size
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [minWidth])
    return { queryMatches }
}
