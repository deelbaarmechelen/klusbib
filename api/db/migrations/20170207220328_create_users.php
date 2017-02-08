<?php

use Phinx\Migration\AbstractMigration;
use Illuminate\Database\Capsule\Manager as Capsule;

require __DIR__ . '/../../src/settings.php';
/**
 * Custom template for database migration with Illuminate\Database
 * 
 * Default template can be found at https://github.com/robmorgan/phinx/blob/master/src/Phinx/Migration/Migration.template.php.dist
 */
class CreateUsers extends AbstractMigration
{
    /**
     * Up Method.
     *
     * Called when invoking migrate
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
	public function up()
	{
		Capsule::schema()->create('users', function(Illuminate\Database\Schema\Blueprint $table){
			// Auto-increment id
			$table->increments('user_id');
			$table->string('firstname', 50)->nullable()->default(null);
			$table->string('lastname', 50)->nullable()->default(null);
			$table->string('role', 20)->nullable()->default(null); // admin, member, ...
			$table->date('membership_start_date')->nullable()->default(null);
			$table->date('membership_end_date')->nullable()->default(null);
				
			// Required for Eloquent's created_at and updated_at columns
			$table->timestamps();
		});
	}
    /**
     * Down Method.
     *
     * Called when invoking rollback
     */
	public function down()
	{
		Capsule::schema()->drop('users');
	}
}