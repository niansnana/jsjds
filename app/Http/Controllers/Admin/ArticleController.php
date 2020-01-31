<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Article_class;

class ArticleController extends Controller
{
    //
    public function index(){
        $data = Article::get();
        return view('admin.article.index',compact('data'));
    }
    public function content(Article $article){
        return view('admin.article.content',compact('article'));
    }
    public function add(Request $request){
        if($request->isMethod('GET')){
            $data = Article_class::get();
            return view('admin.article.add',compact('data'));
        }else{
            // 提交
            $data = $request->except('_token','file');
            $data['created_at'] = date('Y-m-d H:i:s');
            $data['updated_at'] = date('Y-m-d H:i:s');
            $result = Article::insert($data);
            return $result ? '1' : '0';
        }
    }
    // wangeditor 富文本编辑器->图片上传
    public function upload(Request $request){
        $path = $request->file('wangEditorH5File')->storePublicly(md5(time()));
        return asset('storage/'.$path);
    }

    public function update(Article $article,Request $request){
        if($request->isMethod('get')){
            $data = Article_class::get();
            return view('admin.article.update',compact('data','article'));
        }else{
            // 修改
            $data = $request->except('_token','file');
            $data['updated_at'] = date('Y-m-d H:i:s');
            $result = $article->update($data);
            return $result ? '1' : '0';
        }
    }
    public function delete(Request $request){
        $result = Article::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
}
