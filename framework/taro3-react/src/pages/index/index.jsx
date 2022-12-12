import React, { Component } from "react";
import { View } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/taro";
import "./index.css";

const { clearSceneCache } = requirePlugin("kivicube");

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // 注意：因为taro 3.X的Bug，导致暂时只能监听触发ready, photo和error事件，其他包含驼峰式名称的事件不能被监听触发
  // https://github.com/NervJS/taro/issues/8005
  // https://github.com/NervJS/taro/issues/8416
  ready = () => {
    console.log("ready", this);
    wx.showToast({ title: "场景加载中...", icon: "none" });
  };

  downloadStart = () => {
    console.log("downloadStart");
  };

  downloadProgress = ({ detail: progress }) => {
    console.log("downloadProgress", progress);
  };

  downloadEnd = () => {
    console.log("downloadEnd");
  };

  loadStart = () => {
    console.log("loadStart");
  };

  loadEnd = () => {
    console.log("loadEnd");
  };

  sceneStart = () => {
    console.log("sceneStart");
    wx.showToast({ title: "可开始体验场景", icon: "none" });
  };

  openUrl = ({ detail: url }) => {
    console.log("openUrl", url);
    wx.navigateTo({ url: `path/to/webview?url=${encodeURIComponent(url)}` });
  };

  photo = ({ detail: photoPath }) => {
    wx.saveImageToPhotosAlbum({
      filePath: photoPath,
      success() {
        console.log("保存照片成功");
      },
      fail(e) {
        console.error("保存照片失败", e);
      },
    });
  };

  error = (e) => {
    const { detail } = e;
    if (detail && detail.isCameraAuthDenied) {
      // 如果是权限问题，则向用户申请权限。
      wx.showModal({
        title: "提示",
        content: "请给予“摄像头”权限",
        success() {
          wx.openSetting({
            success({ authSetting: { "scope.camera": isGrantedCamera } }) {
              if (isGrantedCamera) {
                clearSceneCache();
                wx.redirectTo({ url: "/" + getCurrentInstance().page.route });
              } else {
                wx.showToast({ title: "获取“摄像头”权限失败！", icon: "none" });
              }
            },
          });
        },
      });
    }
    console.error(e);
  };

  render() {
    return (
      <View>
        <kivicube-scene
          sceneId="9vR08tpLesfKVWs2XbbnNKSsX3JqpaAp"
          onReady={this.ready}
          onError={this.error}
          onDownloadAssetStart={this.downloadStart}
          onDownloadAssetProgress={this.downloadProgress}
          onDownloadAssetEnd={this.downloadEnd}
          onLoadSceneStart={this.loadStart}
          onLoadSceneEnd={this.loadEnd}
          onSceneStart={this.sceneStart}
          onOpenUrl={this.openUrl}
          onPhoto={this.photo}
        />
      </View>
    );
  }
}
