<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use Illuminate\Http\Request;
use App\Models\Article;

class IndexController extends Controller
{
    // 首页内容展示
    public function index(){
        // 热点文章
        $anews = Article::where('class_id','=','3')->limit(6)->get();
        $anotices = Article::where('class_id','=','2')->limit(6)->get();
        // 焦点幻灯片
        $slides = Article::where('class_id','=','8')->limit(9)->get();
        // 就业绿色通道
        $jobs = Friend::where('class_id','=','2')->get();
        // 保研院校
        $schools = Friend::where('class_id','=','3')->get();
        // 支持机构
        $supports = Friend::where('class_id','=','4')->get();
        // 友情链接
        $friends = Friend::where('class_id','=','1')->limit(9)->get();
        return view('index',compact('anews','anotices','slides','jobs','schools','supports','friends'));
    }
}
