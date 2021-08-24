import React from "react";
import {Scrollbars} from "react-custom-scrollbars";

const CustomScrollbars = (props) => <Scrollbars  {...props}
                                                 renderTrackHorizontal={props => <div {...props}
                                                                                      className="track-horizontal"/>}/>;

export default CustomScrollbars;
