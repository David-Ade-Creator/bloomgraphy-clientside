import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

const CustomScrollbars = (props) => {
    const {scrolltobottom, message} = props;
    const scrollRef = React.useRef(null);
    const scrollHeight = scrollRef.current?.getScrollHeight();

    React.useEffect(()=>{
        if(scrolltobottom || message)
        scrollRef.current.scrollTop(scrollRef.current?.getScrollHeight());
    },[scrolltobottom, scrollHeight, message]);
    
    return <Scrollbars ref={scrollRef} {...props}
                                                 renderTrackHorizontal={props => <div {...props}
                                                                                      className="track-horizontal"/>}/>;
}

export default CustomScrollbars;
