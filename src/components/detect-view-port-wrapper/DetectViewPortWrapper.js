import React, {useState, useEffect} from 'react';
import {ViewPortContxt} from "../../context/ViewPortContext";

export const viewPorts = {
    desktop: 'desktop',
    mobile: 'mobile',
    tablet: 'tablet'
}
const DESKTOP_WIDTH = 992;
const TABLET_WIDTH = 768;

function DetectViewPortWrapper(props) {

    let [viewPort, setViewPort] = useState(viewPorts.desktop);

    useEffect(() => {
        window.addEventListener('resize', updateViewPort)
    }, [])

    useEffect(() => {
        return () => {
            window.removeEventListener('resize', updateViewPort)
        }
    }, [])

    const updateViewPort = () => {
        const width = window.innerWidth;
        let viewport = viewPorts.desktop;

        if (width >= DESKTOP_WIDTH) {
            viewport = viewPorts.desktop;
        } else if (width >= TABLET_WIDTH) {
            viewport = viewPorts.tablet
        } else {
            viewport = viewPorts.mobile
        }
        setViewPort(viewPort = viewport)
    }
    const {children} = props
    return (
        <ViewPortContxt.Provider value={viewPort} children={children}/>
    );
}

export default DetectViewPortWrapper;