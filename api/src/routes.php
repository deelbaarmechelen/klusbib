<?php
// Routes

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

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

$app->post('/tools/new', function (Request $request, Response $response) {
	$data = $request->getParsedBody();
	$tools_data = [];
	$tools_data['title'] = filter_var($data['title'], FILTER_SANITIZE_STRING);
	$tools_data['description'] = filter_var($data['description'], FILTER_SANITIZE_STRING);
	// ...
});