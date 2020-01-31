<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;

class ArticleRecycleController extends Controller
{
    //
    public function index(){
        $data = Article::where('class_type','=','2')->get();
        return view('admin.article_recycle.index',compact('data'));
    }
    public function restore(Request $request){
        $result = Article::where(['id' => $request->get('id')])->update(['class_type'=>'0']);
        return $result ? '1' : '0';
    }
    public function delete(Request $request){
        $result = Article::find($request->get('id'))->delete();
        return $result ? '1' : '0';
    }
}
