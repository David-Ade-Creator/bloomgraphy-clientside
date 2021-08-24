import React, {Component} from "react";
import ReactPlaceholder from "react-placeholder";
import "nprogress/nprogress.css";

import "react-placeholder/lib/reactPlaceholder.css";
import CircularProgress from "components/CircularProgress";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    async componentDidMount() {
      this.mounted = true;
      const {default: Component} = await importComponent();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />
        });
      }
    }

    render() {
      const Component = this.state.component || <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
      return (
        <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
          {Component}
        </ReactPlaceholder>
      );
    }
  }

  return AsyncFunc;
}
