<?php
$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->load();
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
