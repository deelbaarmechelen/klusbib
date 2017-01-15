<?php

namespace Api\Migration;

use Illuminate\Database\Capsule\Manager as Capsule;
use Phinx\Migration\AbstractMigration;

class Migration extends AbstractMigration {
	/** @var \Illuminate\Database\Capsule\Manager $capsule */
	public $capsule;
	/** @var \Illuminate\Database\Schema\Builder $capsule */
	public $schema;

	public function init()
	{
		$settings = require __DIR__ . '/../../settings.php';
		$db = $settings['settings']['db'];
		
		$this->capsule = new Capsule;
		$this->capsule->addConnection([
				'driver'    => 'mysql',
				'host' => $db['host'],
				'port' => $db['port'],
				'database' => $db['dbname'],
				'username' => $db['user'],
				'password' => $db['pass'],
				'charset'   => 'utf8',
				'collation' => 'utf8_unicode_ci',
		]);

		$this->capsule->bootEloquent();
		$this->capsule->setAsGlobal();
		$this->schema = $this->capsule->schema();
	}
}