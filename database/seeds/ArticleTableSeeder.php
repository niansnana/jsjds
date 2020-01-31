<?php

use Illuminate\Database\Seeder;

class ArticleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 文章填充
        $faker = \Faker\Factory::create('zh_CN');
        for($i=0;$i<100;$i++){
            $data[] = [
              'title' => $faker->paragraph(1),
              'author' => $faker->name,
              'keywords' => $faker->word(1),
                'images' => '/static/images/news.jpg',
                'file_url' => 'N/A',
                'description' => $faker->sentence(2),
                'content' => $faker->text,
                'link' => '#',
                'class_id' => rand(1,6),
                'class_type' => rand(0,2),
                'sort' => rand(1,50),
                'status' => rand(1,2),
                'views' => rand(50,500),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
        }
        DB::table('article')->insert($data);
    }
}
