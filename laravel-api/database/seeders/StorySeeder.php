<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Story;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Story::create([
            'title'     => 'title1',
            'content'    => 'content1',
            'status' => 'Published',
            'user_id'     => '1',
        ]);

        Story::create([
            'title'     => 'title2',
            'content'    => 'content2',
            'status' => 'Published',
            'user_id'     => '2',
        ]);

        Story::create([
            'title'     => 'title3',
            'content'    => 'content3',
            'status' => 'Published',
            'user_id'     => '2',
        ]);

        Story::create([
            'title'     => 'title4',
            'content'    => 'content4',
            'status' => 'Published',
            'user_id'     => '1',
        ]);

        Story::create([
            'title'     => 'title5',
            'content'    => 'content5',
            'status' => 'Published',
            'user_id'     => '1',
        ]);
    }
}
