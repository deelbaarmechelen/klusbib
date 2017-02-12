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
    	$startdate = new DateTime();
    	$enddate = clone $startdate;
    	$enddate->add(new DateInterval('P7D'));
    	Capsule::table('users')->insert([
    			'firstname' => 'admin',
    			'lastname' => 'admin',
    			'role' => 'admin', 
    			'membership_start_date' => $startdate,
    			'membership_end_date' => $enddate
    	]);
    	}
}
