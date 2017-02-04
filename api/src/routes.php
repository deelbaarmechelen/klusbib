<?php
// Routes

$app->get('/', function ($request, $response, $args) {
	// Sample log message
	$this->logger->info("Slim-Skeleton '/' route");

	// Render index view
	return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/hello' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/tools', function ($request, $response, $args) {
	// Sample log message
	$this->logger->info("Klusbib '/tools' route");
	$data = array(array("id" => "wood-1",
				"name" => "wipzaag",
				"description" => "Simpele wipzaag",
				"link" => null,
				"category" => "wood"
		)
	);
	return $response->withJson($data);
});

$app->get('/tools/new', function ($request, $response, $args) {
// 	$app->post('/tools/new', function (Request $request, Response $response) {
// 	$data = $request->getParsedBody();
// 	echo $args;
	$tool = new \Api\Model\Tool();
// 	$tool->name = filter_var($data['name'], FILTER_SANITIZE_STRING);
	$tool->name = 'test';
	$tool->description = 'my new tool';
	$tool->save();
	echo 'created';
// 	$tool->description = filter_var($data['description'], FILTER_SANITIZE_STRING);
	// 	$tools_data = [];
// 	$tools_data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
// 	$tools_data['description'] = filter_var($data['description'], FILTER_SANITIZE_STRING);
// 	$tools_data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
	// ...
});

// 	$app->get('/create', function(){
// 		$widget = new \MyProject\Model\Widget();
// 		$widget->serial_number = 123;
// 		$widget->name = 'My Test Widget';
// 		$widget->save();
// 		echo 'Created!';
// 	});