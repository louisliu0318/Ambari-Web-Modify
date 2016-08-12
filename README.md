# Ambari-Web二次开发

标签： Ambari Bigdata

---
[TOC]

## 调试过程

### 开发环境搭建

参考Ambari的编译环境搭建，尤其注意node/npm等软件的安装

### 安装samba

samba 可以协议共享Linux中的文件，以达到在Windows上完成代码修改，在Linux上看效果的目的

#### 安装

    yum install samba

#### 启动samba

    service smb restart  或者  /etc/init.d/smbd restart
    
#### 创建共享用户

    //添加一个Linux用户
    useradd samba
    // 创建 Smb 用户，此用户必须是 Linux 上已经建立的，输入密码，完成即可
    smbpasswd -a samba 。

#### 关闭防火墙和setenforce 

    srvice iptables stop
    setenforce 0

#### 修改samba配置文件，设定共享路径

    vim /etc/samba/smb.conf 

添加内容

    [samba home]
        path = /usr/local/soft
        writeable = yes
        guest ok = no

注意：对共享的文件夹要修改其他用户具有写权限，否则修改会无法保存

#### Windows下连接
    
    重启服务
    service smb restart 

在Windows下文件地址栏输入\\<samba_ip>,输入smb帐号密码就可以了

### 调试流程

Linux下进入ambari源码目录

    cd /usr/local/soft/bigdata/ambari/apache-ambari-2.2.2-src

启动brunch
    
    brunch watch --server

访问所在ip的3333端口访问即可

在Windows下对内容修改后，ambari-web项目会自动编译，在浏览器刷新，会看到修改后的效果



    

## 汉化及内容修改
Ambari-web中一般需要修改/app下的文件，从而影响构建在/public的文件

### 常规汉化修改

    修改
    ambari-web/app/messages.js
    影响了
    ambari-web/public/javascripts/app.js

### 登录页和主页底部版权信息的修改

    修改
    ambari-web/app/assets/index.html
    影响了
    ambari-web/public/index.html    

### 主页alerts标签

    ambari-web/app/templates/application.hbs

### 关于信息页面

    ambari-web/app/templates/common/about.hbs

### 关于信息页版本号的修改

    修改
    ambari-web/app/assets/data/services/ambari_server.json
    影响了
    ambari-web/public/data/services/ambari_server.json
    
## 样式修改

### 一般样式信息修改

    修改
    ambari-web/app/styles/common.less
    ambari-web/app/styles/application.less
    影响了
    ambari-web/public/stylesheets/app.css

### 基于BootsStrap的修改
    
    修改
    ambari-web/vendor/styles/bootstrap.css
    影响了
    ambari-web/public/stylesheets/vendor.css
    
    例如:
    将body的font-family改为更适合中文字体显示
    "Arial","Microsoft YaHei","黑体","宋体",sans-serif;

### 图标及Logo修改

    ambari-web/app/assets/img/logo.png
    ambari-web/app/assets/img/logo-white.png




