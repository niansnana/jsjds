<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article_class;

class ArticleClassController extends Controller
{
    // 文章分类
    public function index(){
        $data = Article_class::get();
        return view('admin.article_class.index',compact('data'));
    }
    public function add(Request $request){
        if($request->isMethod('get')){
            return view('admin.article_class.add');
        }else{
            $data = $request->except('_token');
            $result = Article_class::insert($data);
            return $result ? '1' : '0';
        }
    }
    public function update(Request $request,Article_class $id){
        if($request->isMethod('get')){
            return view('admin.article_class.update',compact('id'));
        }else{
            $data = $request->except('_token');
            $result = $id->update($data);
            return $result ? '1' : '0';
        }
    }
    public function delete(Request $request){
        $result = Article_class::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
}
