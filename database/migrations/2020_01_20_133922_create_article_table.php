<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title'); # 文章标题
            $table->string('author'); # 文章作者
            $table->string('keywords'); # 文章关键词
            $table->string('images')->nullable(); # 文章标题图片
            $table->string('file_url')->nullable(); # 第三方文件
            $table->string('description')->nullable(); # 文章摘要
            $table->text('content')->nullable(); # 文章内容
            $table->string('link')->nullable(); # 文章外链地址
            $table->integer('class_id')->default('1'); # 文章分类id
            $table->enum('class_type',[0,1,2])->default('1'); # 文章类型，0-普通文章，1-首页文章，2-外链文章
            $table->integer('sort'); # 文章排序
            $table->enum('status',[1,2])->default('2'); # 文章状态，1-禁用，2-启用
            $table->integer('views')->default('0'); # 文章浏览量
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article');
    }
}
