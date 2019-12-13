import React, { useEffect, useState } from 'react'

export default function DelayLoading(props) {
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            setShowLoading(true);
        }, props.delay)
        return () => {
            clearTimeout(timeout)
        };
    }, [props.delay])
    if (showLoading)
        return <>{props.children}</>
    else
        return null;

}
