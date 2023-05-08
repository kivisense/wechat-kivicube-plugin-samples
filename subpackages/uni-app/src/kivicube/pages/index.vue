<template>
  <view>
    <kivicube-scene
      class="kivicube"
      sceneId="9vR08tpLesfKVWs2XbbnNKSsX3JqpaAp"
      @ready="ready"
      @error="error"
      @downloadAssetStart="downloadStart"
      @downloadAssetProgress="downloadProgress"
      @downloadAssetEnd="downloadEnd"
      @loadSceneStart="loadStart"
      @loadSceneEnd="loadEnd"
      @sceneStart="sceneStart"
      @openUrl="openUrl"
      @photo="photo"
    />
  </view>
</template>

<script>
const { clearSceneCache } = requirePlugin("kivicube");

export default {
  methods: {
    ready() {
      console.log("ready");
      wx.showToast({ title: "场景加载中...", icon: "none" });
    },
    downloadStart() {
      console.log("downloadStart");
    },
    downloadProgress({ detail: progress }) {
      console.log("downloadProgress", progress);
    },
    downloadEnd() {
      console.log("downloadEnd");
    },
    loadStart() {
      console.log("loadStart");
    },
    loadEnd() {
      console.log("loadEnd");
    },
    sceneStart() {
      console.log("sceneStart");
      wx.showToast({ title: "可开始体验场景", icon: "none" });
    },
    openUrl({ detail: url }) {
      console.log("openUrl", url);
      wx.navigateTo({ url: `path/to/webview?url=${encodeURIComponent(url)}` });
    },
    photo({ detail: photoPath }) {
      wx.saveImageToPhotosAlbum({
        filePath: photoPath,
        success() {
          console.log("保存照片成功");
        },
        fail(e) {
          console.error("保存照片失败", e);
        }
      });
    },
    error(e) {
      const { detail } = e;
      if (detail && detail.isCameraAuthDenied) {
		// 如果是权限问题，则向用户申请权限。
		const page = this;
        wx.showModal({
          title: "提示",
          content: "请给予“摄像头”权限",
          success() {
            wx.openSetting({
              success({ authSetting: { "scope.camera": isGrantedCamera } }) {
                if (isGrantedCamera) {
                  clearSceneCache();
                  wx.redirectTo({ url: "/" + page.route });
                } else {
                  wx.showToast({
                    title: "获取“摄像头”权限失败！",
                    icon: "none"
                  });
                }
              }
            });
          }
        });
      }
      console.error(e);
    }
  }
};
</script>

<style scoped>
.kivicube {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
