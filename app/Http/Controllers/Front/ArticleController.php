<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // 大赛新闻
    public function news(){
        $data = Article::where('class_id','=','3')->paginate(8);
        return view('article_list',compact('data'));
    }
    // 大赛通知
    public function notice(){
        $data = Article::where('class_id','=','2')->paginate(8);
        return view('article_list',compact('data'));
    }
    // 内容详情
    public function show(Article $article){
        $article->update(['views' => $article['views'] += 1]);
        return view('article_show',compact('article'));
    }

    // 组织机构
    public function organization(){}
    // 作品分类
    public function category(){}
    // 国赛速递
    public function national(){}
    // 往届信息
    public function previous(){}


}
