import React, {useContext} from 'react';

import Header from "./DesktopHeader";
import {MobileHeader} from "./MobileHeader";
import {TabletHeader} from "./TabletHeader";

import {viewPorts} from "../detect-view-port-wrapper/DetectViewPortWrapper";
import {ViewPortContxt} from "../../context/ViewPortContext";

function IndexHeader()  {

        const viewPort = useContext(ViewPortContxt)
        if (viewPort === viewPorts.desktop) {
            return <Header/>
        }

        if (viewPort === viewPorts.tablet) {
            return <TabletHeader/>
        }

        if (viewPort === viewPorts.mobile) {
            return <MobileHeader/>
        }
}

export default IndexHeader;