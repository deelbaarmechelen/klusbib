<?php
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();
return array(
		"paths" => array(
				"migrations" => "%%PHINX_CONFIG_DIR%%/db/migrations",
				"seeds" => "%%PHINX_CONFIG_DIR%%/db/seeds"
		),
		"templates" => array(
				"file" => "%%PHINX_CONFIG_DIR%%/templates/migration.template.php.dist",
		),
		// 		'migration_base_class' => '\Api\Migration\Migration',
		"environments" => array(
				"default_migration_table" => "phinxlog",
				"default_database" => "dev",
				"dev" => array(
						"adapter" => "mysql",
						"host" => getenv('DB_HOST'),
						"name" => getenv('DB_NAME'),
						"user" => getenv('DB_USER'),
						"pass" => getenv('DB_PASS'),
						"port" => getenv('DB_PORT')
				)
		)
);
