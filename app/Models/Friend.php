<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    // 友情表
    protected $table = 'friend';
    protected $guarded = [];

    public function friend_class(){
        return $this->hasOne('\App\Models\Friend_class','id','class_id');
    }
}
