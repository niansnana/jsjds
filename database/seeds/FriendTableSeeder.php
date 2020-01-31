<?php

use Illuminate\Database\Seeder;

class FriendTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 填充友情表
        $faker = \Faker\Factory::create();
        for($i=0;$i<50;$i++){
            $data[] = [
              'title' => $faker->sentence,
              'description' => $faker->paragraph,
                'images' => '/static/images/friendLink.png',
                'url' => '#',
                'class_id' => rand(1,6),
                'status' => rand(1,2),
                  'created_at' => date('Y-m-d H:i:s'),
                  'updated_at' => date('Y-m-d H:i:s')
            ];
        }
        DB::table('friend')->insert($data);
    }
}

