import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

const CustomScrollbars = (props) => {
    const {scrollToBottom, message} = props;
    const scrollRef = React.useRef(null);
    const scrollHeight = scrollRef.current?.getScrollHeight();

    React.useEffect(()=>{
        if(scrollToBottom || message)
        scrollRef.current.scrollTop(scrollRef.current?.getScrollHeight());
    },[scrollToBottom, scrollHeight, message]);
    
    return <Scrollbars ref={scrollRef} {...props}
                                                 renderTrackHorizontal={props => <div {...props}
                                                                                      className="track-horizontal"/>}/>;
}

export default CustomScrollbars;
