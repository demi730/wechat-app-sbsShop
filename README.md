# wechat-app-sbsShop
sbsShop：基于ThinkPHP开发的微信小程序外卖应用（微信小程序）
## 小程序服务端 server_api 部署方法
### 部署步骤
1.安装PHP集成环境软件[WampServer](https://www.wampserver.com/#download-wrapper)
2.配置开发环境
* 修改Apache的HTTP端口号为8087。启动WampServer后，单击图标，选择Apache下的httpd.conf。在打开的httpd.conf文件中，查找“Listen 80”,并将其修改为“Listen 8087”。
* 下载server_api重命名为foods放到WampServer安装目录下的www目录下,单击phpMyAdmin,使用mysql账号登录后（默认用户名root，密码空） 导入数据 foods.sql。




