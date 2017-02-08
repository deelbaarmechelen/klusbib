<?php

use Phinx\Migration\AbstractMigration;
use Illuminate\Database\Capsule\Manager as Capsule;

require __DIR__ . '/../../src/settings.php';
/**
 * Custom template for database migration with Illuminate\Database
 * 
 * Default template can be found at https://github.com/robmorgan/phinx/blob/master/src/Phinx/Migration/Migration.template.php.dist
 */
class CreateReservations extends AbstractMigration
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
		Capsule::schema()->create('reservations', function(Illuminate\Database\Schema\Blueprint $table){
			// Auto-increment id
			$table->increments('reservation_id');
			$table->integer('tool_id')->unsigned;
			$table->integer('user_id')->unsigned;
			$table->string('title', 50)->nullable()->default(null);
			$table->date('startsAt')->nullable()->default(null);
			$table->date('endsAt')->nullable()->default(null);
			$table->string('type', 20)->nullable()->default(null);
				
			// Required for Eloquent's created_at and updated_at columns
			$table->timestamps();
			
			$table->index('tool_id');
// 			$table->foreign('tool_id')->references('tool_id')->on('tools');
			$table->index('user_id');
// 			$table->foreign('user_id')->references('user_id')->on('users');
		});
	}
    /**
     * Down Method.
     *
     * Called when invoking rollback
     */
	public function down()
	{
		Capsule::schema()->table('reservations', function(Illuminate\Database\Schema\Blueprint $table) {
			$table->dropIndex('reservations_tool_id_index');
			$table->dropIndex('reservations_user_id_index');
// 			$table->dropForeign('tools_tool_id_foreign');
		});
		Capsule::schema()->drop('reservations');
	}
}