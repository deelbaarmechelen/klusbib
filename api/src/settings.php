<?php
$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->load();

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

$capsule = new Capsule;

$capsule->addConnection([
			'driver'    => 'mysql',
			'host' => getenv('DB_HOST'),
			'database' => getenv('DB_NAME'),
			'username' => getenv('DB_USER'),
			'password' => getenv('DB_PASS'),
			'charset'   => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix'    => '',
]);

// Set the event dispatcher used by Eloquent models... (optional)
$capsule->setEventDispatcher(new Dispatcher(new Container));

// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();

return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'klusbib-api',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    
    	// Database settings
    	'db' => [
    		'host' => getenv('DB_HOST'),
    		'user' => getenv('DB_USER'),
    		'pass' => getenv('DB_PASS'),
    		'dbname' => getenv('DB_NAME'),
    		'port' => getenv('DB_PORT')
    	],
    ],
];
