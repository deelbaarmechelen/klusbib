<?php

use Phinx\Seed\AbstractSeed;
use Illuminate\Database\Capsule\Manager as Capsule;

require __DIR__ . '/../../src/settings.php';

class ToolsTableSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
    	Capsule::table('tools')->insert([
    			'name' => 'tool ' . str_random(10),
    			'description' => 'description of this tool',
    			'link' => null,
    			'category' => 'wood',
    	 ]);
    	     		 
    }
}
