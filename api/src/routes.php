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

$app->get('/tools/{toolid}', function ($request, $response, $args) {
	$this->logger->info("Klusbib '/tools' route");
	$startdate = new DateTime();
	$enddate = clone $startdate;
	$enddate->add(new DateInterval('P7D'));
	$startdate2 = new DateTime();
	$startdate2->add(new DateInterval('P14D'));
	$enddate2 = clone $startdate2;
	$enddate2->add(new DateInterval('P7D'));
	$data = array("id" => "wood-1",
			"name" => "wipzaag",
			"description" => "Simpele wipzaag",
			"link" => null,
			"category" => "wood",
			"reservations" => array(array(
				"id" => "tool1-reservation1",
				"title" => "My Reservation",
                "color" => "yellow",
                "startsAt" => $startdate->format('Y-m-d'),
                "endsAt" => $enddate->format('Y-m-d'),
                "draggable" => true,
                "resizable" => true,
                "actions" => "actions"
			),
			array(
				"id" => "tool1-reservation2",
				"title" => "My Second Reservation",
				"color" => "red",
				"startsAt" => $startdate2->format('Y-m-d'),
				"endsAt" => $enddate2->format('Y-m-d'),
				"draggable" => true,
				"resizable" => true,
				"actions" => "actions"
			)
		)
	);
	return $response->withJson($data);
});	

// 	$app->get('/create', function(){
// 		$widget = new \MyProject\Model\Widget();
// 		$widget->serial_number = 123;
// 		$widget->name = 'My Test Widget';
// 		$widget->save();
// 		echo 'Created!';
// 	});