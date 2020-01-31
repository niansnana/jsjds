<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 *
 *
 * 计算机设计大赛
 * www.jsjds.edu.com
 * 5.0
 */
# 未通过验证
Route::group([
    'prefix' => 'admin'
],function(){
    Route::get('/','Admin\LoginController@index')->name('login');    // 后台登录
    Route::post('/check','Admin\LoginController@check');    // 登录验证
    Route::get('/logout','Admin\LoginController@logout');    // 退出登录
});
# 经过验证通过方可访问的页面
Route::group([
    'prefix' => 'admin',
    'middleware' => ['auth:admin','checkrbac']
],function (){
    Route::get('index','Admin\IndexController@index');  // 后台首页
    Route::get('welcome','Admin\IndexController@welcome');  // 后台主要展示切换页面
# TODO：RBAC
    # 管理员
    Route::get('admin','Admin\AdminController@index');  // 管理员列表(查)
    Route::any('admin/add','Admin\AdminController@add');  // 增
    Route::any('admin/{admin}/update','Admin\AdminController@update');  // 改
    Route::post('admin/delete','Admin\AdminController@delete');  // 删
    Route::post('admin/start','Admin\AdminController@start');  // 状态启用
    Route::post('admin/end','Admin\AdminController@end');  // 状态停用
    # 角色
    Route::get('role','Admin\RoleController@index');    // 角色列表
    Route::any('role/add','Admin\RoleController@add');    // 角色添加
    Route::any('role/{role}/update','Admin\RoleController@update');    // 角色修改
    Route::post('role/delete','Admin\RoleController@delete');    // 角色删除
    Route::any('role/assign','Admin\RoleController@assign');    // 权限分配
    # 权限
    Route::get('auth','Admin\AuthController@index');    // 权限列表
    Route::any('auth/add','Admin\AuthController@add');    // 权限添加
    Route::any('auth/update/{id}','Admin\AuthController@update');    // 权限修改
    Route::post('auth/delete','Admin\AuthController@delete');    // 权限删除
# TODO：头像和文件的上传
    Route::post('uploader/webuploader','Admin\UploaderController@webuploader');#   异步上传头像
    Route::post('uploader/qiniu','Admin\UploaderController@qiniu');#   异步上传头像 TODO：七牛的方式

    Route::get('404',function (){
        return view('admin.index.404');
    });
# TODO：文章管理
    Route::get('article','Admin\ArticleController@index');      # 文章列表
    Route::get('article/content/{article}','Admin\ArticleController@content');      # 文章详情
//    Route::post('article/image','Admin\ArticleController@image');      # 文章富文本图片
    Route::any('article/add','Admin\ArticleController@add');    # 文章添加
    Route::any('article/update/{article}','Admin\ArticleController@update');    # 文章修改
    Route::post('article/delete','Admin\ArticleController@delete');    # 文章删除
# 文章分类
    Route::get('article/class','Admin\ArticleClassController@index');    // 文章分类列表
    Route::any('article/class/add','Admin\ArticleClassController@add');    // 文章分类添加
    Route::any('article/class/update/{id}','Admin\ArticleClassController@update');    // 文章分类修改
    Route::post('article/class/delete','Admin\ArticleClassController@delete');    // 文章分类删除

    Route::post('editor/upload','Admin\ArticleController@upload');      # 文章富文本图片


# 文章回收站
    Route::get('article/recycle','Admin\ArticleRecycleController@index');# 查看
    Route::post('article/recycle/restore','Admin\ArticleRecycleController@restore');# 恢复
    Route::post('article/recycle/delete','Admin\ArticleRecycleController@delete');# 删除
# TODO：友情链接
    Route::get('friend','Admin\FriendController@index');
    Route::any('friend/add','Admin\FriendController@add');# 添加
    Route::any('friend/update/{friend}','Admin\FriendController@update');# 修改
    Route::any('friend/delete','Admin\FriendController@delete');# 删除
# 友情链接分类
    Route::get('friend/class','Admin\FriendClassController@index');
    Route::any('friend/class/add','Admin\FriendClassController@add');
    Route::any('friend/class/update/{id}','Admin\FriendClassController@update');
    Route::post('friend/class/delete','Admin\FriendClassController@delete');
# TODO：系统设置
    Route::any('system/{system}','Admin\SystemController@index');// 系统设置

# TODO: 个人信息
    Route::any('person','Admin\PersonController@index');
    Route::any('person/show','Admin\PersonController@show');

# TODO：数据可视化
    Route::any('admin/charts','Admin\ChartsController@index');
});


# TODO：前台
Route::get('/','Front\IndexController@index');

Route::get('article/news','Front\ArticleController@news'); # 大赛新闻
Route::get('article/notice','Front\ArticleController@notice'); # 大赛通知
Route::get('article/organization','Front\ArticleController@organization'); # 组织机构
Route::get('article/category','Front\ArticleController@category'); # 作品分类
Route::get('article/national','Front\ArticleController@national'); # 国赛速递
Route::get('article/previous','Front\ArticleController@previous'); # 往届信息
Route::get('article/show/{article}','Front\ArticleController@show'); # 详情展示
