import React from "react";
import ReactDOM from "react-dom";
import geohash from "ngeohash";
import math from "mathjs";
import { list } from "./massiveMarkerSet";
import "./styles.css";

class Home extends React.Component {
  constructor() {
    super();
    this.map = null;
    this.cluster = null;
    this.polygonSet = [];
    this.polygonGroup = null;
    this.centerMarkerSet = [];
  }
  componentDidMount() {
    this.loadSDK();
  }
  loadSDK() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//webapi.amap.com/maps?v=1.4.8&key=d31b7fd120ebd92bd7aee6cca547fb2b&callback=__amap_init_callback";
    document.querySelector("body").appendChild(script);
    window.__amap_init_callback = () => {
      window.__amap_init_callback = null;
      this.map = new window.AMap.Map("container", {
        baseRender: "d"
      });
      this.polygonGroup = new window.AMap.OverlayGroup();
      this.map.plugin(["AMap.MarkerClusterer"], () => {
        this.renderMarkerList();
        this.renderCluster();
      });
      this.map.on("zoomend", () => {
        const zoom = this.map.getZoom();
        this.visibilityPolygon(zoom > 12);
      });
    };
  }
  visibilityPolygon(show) {
    const list = this.polygonSet;
    const op = list[0];
    console.log("op", op.getOptions());
    // show ? this.polygonGroup.show() : this.polygonGroup.hide();
    for (let polygon of list) {
      if (show && polygon.F.visibility) {
        continue;
      }
      if (!show && !polygon.F.visibility) {
      }
      show ? polygon.show() : polygon.hide();
    }
  }

  renderMarkerList() {
    // for (let i = 0; i <= list.length; i++) {
    const zoom = this.map.getZoom();
    for (let cur of list) {
      const path = cur.lnglat;
      const polygon = new window.AMap.Polygon({
        path
      });
      // polygon.setMap(this.map);
      const center = polygon.getBounds().getCenter();
      const marker = new window.AMap.Marker({
        position: center,
        visible: false
      });
      this.centerMarkerSet.push(marker);
      this.polygonSet.push(polygon);
    }
    this.polygonGroup.addOverlays(this.polygonSet);
    this.polygonGroup.hide();
    this.polygonGroup.setMap(this.map);
    this.cluster = new window.AMap.MarkerClusterer(
      this.map,
      this.centerMarkerSet,
      {}
    );
    console.log("this.cluster---", this.cluster);
  }

  renderCluster() {
    console.log("fuck");
  }

  render() {
    return <div id="container" />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement);
