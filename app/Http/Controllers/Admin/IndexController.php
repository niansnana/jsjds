<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    // SHOW TIME
    public function index(){
        return view('admin.index.index');
    }
    public function welcome(){
        return view('admin.index.welcome');
    }
}
