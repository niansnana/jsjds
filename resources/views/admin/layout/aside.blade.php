<header class="navbar-wrapper">
    <div class="navbar navbar-fixed-top">
        <div class="container-fluid cl">
            <a class="logo navbar-logo f-l mr-10 hidden-xs" href="/admin/index">
                <img src="{{'/static/images/adminlogo.png/'}}" alt="">
            </a>
            <a class="logo navbar-logo-m f-l mr-10 visible-xs" href="/admin/index">CDC Admin</a>
{{--            <span class="logo navbar-slogan f-l mr-10 hidden-xs">v5.0</span>--}}
            <a aria-hidden="false" class="nav-toggle Hui-iconfont visible-xs" href="javascript:;">&#xe667;</a>
            <nav class="nav navbar-nav">
                <ul class="cl">
                    <li class="dropDown dropDown_hover">
                        <a class="pngfix" href="javascript:void(0);" onclick="displaynavbar(this)">
                            <i class="Hui-iconfont">&#xe667;</i>
                        </a>
                    </li>
                </ul>
            </nav>
            <nav id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">
                <ul class="cl">
                    <li id="Hui-msg">
                        <a href="#" title="消息">
                            <span class="badge badge-danger">1</span>
                            <i class="Hui-iconfont" style="font-size:18px">&#xe68a;</i>
                        </a>
                    </li>
                    <li id="Hui-skin" class="dropDown right dropDown_hover">
                        <a href="javascript:;" class="dropDown_A" title="换肤">
                            <i class="iconfont icon-zhuanshi" style="font-size: 16px;"></i>
                        </a>
                        <ul class="dropDown-menu menu radius box-shadow">
                            <li><a href="javascript:;" data-val="default" title="默认（黑色）">默认（黑色）</a></li>
                            <li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>
                            <li><a href="javascript:;" data-val="green" title="绿色">绿色</a></li>
                            <li><a href="javascript:;" data-val="red" title="红色">红色</a></li>
                            <li><a href="javascript:;" data-val="yellow" title="黄色">黄色</a></li>
                            <li><a href="javascript:;" data-val="orange" title="橙色">橙色</a></li>
                        </ul>
                    </li>
                    <li class="dropDown dropDown_hover">
                        <a href="#" class="dropDown_A">你好 {{ Auth::guard('admin')->user()->username }} <i class="Hui-iconfont">&#xe6d5;</i></a>
                        <ul class="dropDown-menu menu radius box-shadow">
                            <li><a href="javascript:;" onclick="show_me('我的资料','/admin/person/show','','500')">个人信息</a></li>
                            <li><a href="#">切换账户</a></li>
                            <li><a href="/admin/logout">退出</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
<aside class="Hui-aside">
    <div class="menu_dropdown bk_2">
        <dl id="menu-article">
            <dt>
                <i class="Hui-iconfont">&#xe62d;</i> 权限管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i>
            </dt>
            <dd>
                <ul>
                    <li><a data-href="/admin/role" data-title="角色管理" href="javascript:void(0)">角色管理</a></li>
                    <li><a data-href="/admin/auth" data-title="权限管理" href="javascript:void(0)">权限管理</a></li>
                    <li><a data-href="/admin/admin" data-title="管理员列表" href="javascript:void(0)">管理员列表</a></li>
                </ul>
            </dd>
        </dl>
        <dl id="menu-picture">
            <dt><i class="Hui-iconfont">&#xe613;</i> 图片管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i>
            </dt>
            <dd>
                <ul>
                    <li><a data-href="/admin/friend" data-title="友情链接" href="javascript:void(0)">友情链接</a></li>
                    <li><a data-href="/admin/friend/class" data-title="分类管理" href="javascript:void(0)">分类管理</a></li>
                </ul>
            </dd>
        </dl>
        <dl id="menu-product">
            <dt><i class="Hui-iconfont">&#xe620;</i> 文章管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i>
            </dt>
            <dd>
                <ul>
                    <li><a data-href="/admin/article" data-title="文章管理" href="javascript:void(0)">文章管理</a></li>
                    <li><a data-href="/admin/article/class" data-title="文章分类" href="javascript:void(0)">文章分类</a></li>
                    <li><a data-href="/admin/article/recycle" data-title="文章回收" href="javascript:void(0)">文章回收</a></li>
                </ul>
            </dd>
        </dl>
        <dl id="menu-comments">
            <dt><i class="Hui-iconfont">&#xe622;</i> 评论管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i>
            </dt>
            <dd>
                <ul>
                    <li><a data-href="http://h-ui.duoshuo.com/admin/" data-title="评论列表" href="javascript:;">评论列表</a>
                    </li>
                    <li><a data-href="feedback-list.html" data-title="意见反馈" href="javascript:void(0)">意见反馈</a></li>
                </ul>
            </dd>
        </dl>
        <dl id="menu-tongji">
            <dt><i class="Hui-iconfont">&#xe61a;</i> 日志管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i>
            </dt>
            <dd>
                <ul>
                    <li><a data-href="/admin/log/login" data-title="登录日志" href="javascript:void(0)">登录日志</a></li>
                    <li><a data-href="/admin/log/operate" data-title="操作日志" href="javascript:void(0)">操作日志</a></li>
                    <li><a data-href="/admin/log/unusual" data-title="日常日志" href="javascript:void(0)">异常日志</a></li>
                </ul>
            </dd>
        </dl>
        <dl id="menu-system">
            <dt><i class="Hui-iconfont">&#xe62e;</i> 系统管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i>
            </dt>
            <dd>
                <ul>
                    <li><a data-href="/admin/system/1" data-title="系统设置" href="javascript:void(0)">系统设置</a></li>
                    <li><a data-href="/admin/system/menu" data-title="栏目管理" href="javascript:void(0)">栏目管理</a></li>
                    <li><a data-href="/admin/system/data" data-title="数据字典" href="javascript:void(0)">数据字典</a></li>
                    <li><a data-href="/admin/system/shielding" data-title="屏蔽词" href="javascript:void(0)">屏蔽词</a></li>
                </ul>
            </dd>
        </dl>
    </div>
</aside>
</div>
