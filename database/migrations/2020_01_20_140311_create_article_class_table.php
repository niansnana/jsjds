<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleClassTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_class', function (Blueprint $table) {
            # 文章分类表
            $table->bigIncrements('id');
            $table->string('class_name'); # 分类名称
            $table->string('link_url')->nullable(); # 外链地址
            $table->enum('class_type',[0,1,2])->default('1');# 类别类型
            $table->integer('show_in_nav')->default('0'); # 0-否，1-是
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_class');
    }
}
