<?php

use Illuminate\Database\Capsule\Manager as Capsule;

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
	$tools = Capsule::table('tools')->orderBy('name', 'asc')->get();
	$data = array();
	foreach ($tools as $tool) {
		$item  = array(
				"id" => $tool->tool_id,
				"name" => $tool->name,
				"description" => $tool->description,
				"link" => $tool->link,
				"category" => $tool->category
		);
		array_push($data, $item);
	}
// 	$data = array(array("id" => "wood-1",
// 				"name" => "wipzaag",
// 				"description" => "Simpele wipzaag",
// 				"link" => null,
// 				"category" => "wood"
// 		)
// 	);
	return $response->withJson($data);
});

$app->post('/tools/new', function ($request, $response, $args) {
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
	$this->logger->info("Klusbib '/tools/id' route");
	$tools = Capsule::table('tools')->where('tool_id', $args['toolid'])->get();
	if (null == $tools || count($tools) == 0) {
		return $response->withStatus(404);
	}
	$tool = $tools[0];
	
	$data = array("id" => $tool->tool_id,
			"name" => $tool->name,
			"description" => $tool->description,
			"link" => $tool->link,
			"category" => $tool->category,
			"reservations" => array()
	);

	// lookup reservations for this tool
	$reservations = Capsule::table('reservations')->where('tool_id', $args['toolid'])->get();
	if (null == $tools) {
		return $response->withStatus(500);
	}
	
// 	$data["reservations"] = getSampleReservations();
	foreach ($reservations as $reservation) {
		$item  = array(
				"reservation_id" => $reservation->reservation_id,
				"tool_id" => $reservation->tool_id,
				"user_id" => $reservation->user_id,
				"title" => $reservation->title,
// 				"color" => "blue",
// 				"draggable" => true,
// 				"resizable" => true,
// 				"actions" => "actions",
				"startsAt" => $reservation->startsAt,
				"endsAt" => $reservation->endsAt,
				"type" => $reservation->type
		);
		array_push($data["reservations"], $item);
	}
	
	return $response->withJson($data);
});

function getSampleReservations() {
	$reservations = array();
	$startdate = new DateTime();
	$enddate = clone $startdate;
	$enddate->add(new DateInterval('P7D'));
	$startdate2 = new DateTime();
	$startdate2->add(new DateInterval('P14D'));
	$enddate2 = clone $startdate2;
	$enddate2->add(new DateInterval('P7D'));
	
	// supported colours:
	// 	"darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
	// 	"darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
	// 	"darkviolet":"#9400d3"
	
	$reservations = array(
			array(
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
	);
	return $reservations;
}

$app->post('/tools/{toolid}/reservations/new', function ($request, $response, $args) {
	$reservation = new \Api\Model\Reservation();
	$tool->name = 'test';
	$tool->description = 'my new tool';
	$tool->save();
	echo 'created';
});
	
$app->get('/users', function ($request, $response, $args) {
	$this->logger->info("Klusbib '/users' route");
	$users = Capsule::table('users')->orderBy('lastname', 'asc')->get();
	$data = array();
	foreach ($users as $user) {
		$item  = array(
				"user_id" => $user->user_id,
				"firstname" => $user->firstname,
				"lastname" => $user->lastname,
				"role" => $user->role,
				"membership_start_date" => $user->membership_start_date,
				"membership_end_date" => $user->membership_end_date
		);
		array_push($data, $item);
	}
	return $response->withJson($data);
});

$app->get('/users/{userid}', function ($request, $response, $args) {
	$this->logger->info("Klusbib '/users/id' route");
	$users = Capsule::table('users')->where('user_id', $args['userid'])->get();
	if (null == users || count(users) == 0) {
		return $response->withStatus(404);
	}
	$user = users[0];

	$data = array("user_id" => $user->tool_id,
			"firstname" => $user->firstname,
			"lastname" => $user->lastname,
			"link" => $user->link,
			"role" => $user->role,
			"membership_start_date" => $user->membership_start_date,
			"membership_end_date" => $user->membership_end_date,
			"reservations" => array()
	);
	return $response->withJson($data);
});
	
$app->get('/reservations', function ($request, $response, $args) {
	$this->logger->info("Klusbib '/reservations' route");
	$reservations = Capsule::table('reservations')->orderBy('startsAt', 'desc')->get();
	$data = array();
	foreach ($reservations as $reservation) {
		$item  = array(
				"reservation_id" => $reservation->reservation_id,
				"tool_id" => $reservation->tool_id,
				"user_id" => $reservation->user_id,
				"title" => $reservation->title,
				"startsAt" => $reservation->startsAt,
				"endsAt" => $reservation->endsAt,
				"type" => $reservation->type,
			);
		array_push($data, $item);
	}
	return $response->withJson($data);
});

