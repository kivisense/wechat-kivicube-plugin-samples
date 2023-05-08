const { setOptions, setPackageRootPath } = requirePlugin("kivicube");

// 使用license开通图像追踪功能
setOptions({
  license: "OA7EIJ7JB4JmAZ5CiceSt0ScZael9lB0GJTb+5YJ5B6l8idXnc3eJ5/8wlH44ZPycUu1anh7DuOremv6GKmChel5PT4WcQNqny5/vpWy4Zr7Y119sdRK7bGEpBVx6b9IpO2/otJ7e7qQza9ESKBR+0i2EaYxd9khEdWE/ofgsONfEDW+mWqT26i598ev1zbhO8lwGYbUcqhL0UIrTjdLpfG0sBp2a4WqNc3YOnoh0e5EnzRn3h1AXVHpjutf86vwuDgJKq/MTVBZ7Y3dP7K7Jbye9whYL2nrgRQkvw38nsuo/FspqweCujz7MzP1wPpYZLms2KtgGdjzSfuTbWxThQ=="
});
/* 插件版本>=1.5.5支持 */
setPackageRootPath("Kivicube"); // 分包配置中的root值

Page({});