<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## 前言

20年1月份写的laravel后台，项目过于简单，不再赘述。:(

四月补充的详细文档。

## 使用方式

1. 环境要求

   - PHP >= 7.0.0
   - Laravel >= 5.5.0
   - Fileinfo PHP Extension

2. 下载方式

   ```sh
   # 下载项目
   git clone https://github.com/niansnana/jsjds.git
   # 切换项目文件夹，导入sql文件
   cd database > jsjds.sql
   # 运行项目
   php artisan serve
   # 浏览器打开运行地址
   http://127.0.0.1:8000
   ```

3. 附加说明

   遇到任何bug，要冷静处理，因为那都是我遗留下来的。哈哈

## 项目部分截图

- 后台登录页

  ![admin-login](https://cdn.jsdelivr.net/gh/niansnana/figurebed/blog/image/admin-login.jpg)

- 后台首页

  ![admin-index](https://cdn.jsdelivr.net/gh/niansnana/figurebed/blog/image/admin-index.jpg)

- 部分功能展示

  ![admin-add](https://cdn.jsdelivr.net/gh/niansnana/figurebed/blog/image/admin-add.jpg)

- 后台其他功能，不展示了，图多就审美疲劳了。

- 前台首页，也不展示了，压根就没想到很好的渲染美化。

- 更多细节，你可以去下载浏览。

##  实现的功能

- [x] 后台布局

- [x] 增删改查

- [x] RBAC

- [x] 登录token验证

- [x] Ajax局部刷新

- [x] 侧边栏伸缩

- [ ] 评论系统

- [x] 图片上传

- [x] 检索浏览

- [ ] 日志管理

- [x] 弹出框提示

- [ ] 主题色功能

- [ ] echarts数据实时浏览

- [x] 前端全局变量

- [ ] 杂七杂八

  ...

## 感谢栏

十分感谢第三库作者的劳动果实，因为你们使得一些功能较愉快的解决。

- [Laravel](https://laravel.com/) 感谢Taylor Otwell大佬编写的后台框架

- [wangEditor](http://www.wangeditor.com/) 轻量级Web富文本编辑器

- [layui](https://www.layui.com/) 经典模块化前端框架

- [Jquery](https://jquery.com/) 一个较流行的JavaScript 工具库

- [H-ui](http://www.h-ui.net/kehu.shtml) 后台模板框架

- [DataTables](https://datatables.net/) 基于jQuery表格插件

- [Web Uploader](https://fex.baidu.com/webuploader/) 由Baidu WebFE(FEX)团队开发的现代文件上传组件

- [ECharts](https://www.echartsjs.com/zh/index.html) JavaScript 实现的开源可视化库

- [七牛](https://www.qiniu.com/) 图片托管等作用

  ...

十分感谢！

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

作者：[niansnana](https://github.com/niansnana)