<?php

use Phinx\Seed\AbstractSeed;
use Illuminate\Database\Capsule\Manager as Capsule;

require __DIR__ . '/../../src/settings.php';

class UsersTableSeeder extends AbstractSeed
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
    	Capsule::table('users')->insert([
    			'firstname' => 'admin',
    			'lastname' => 'admin',
    			'role' => 'admin', 
    			 'description' => 'description of this tool',
    			'link' => null,
    			'category' => 'wood',
    	]);
    	}
}
