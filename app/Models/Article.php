<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    //
    protected $table = 'article';
    protected $guarded = [];

    public function article_class(){
        return $this->hasOne('App\Models\article_class','id','class_id');
    }
}
