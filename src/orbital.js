var orbitals = [];
var coms = [];
var def = [];
//var buffer = 20;
function Orbital(color, size, x, y, orbit, distance, speed, angle) {
	if (angle === UNDEF) angle = 0;
	var t = {};
	t.name = "Some Shithole Planet";
	t.type = 'orbital';
	t.x = x;
	t.y = y;
	t.color = color;
	t.size = size;
	t.isSun = false;
	t.id = orbitals.length.toString();
	if (orbit)
		t.orbit = {
			planet: orbit,
			distance: distance,
			speed: speed,
			angle: angle
		};
	t.update = function() {

		// Update orbit.
		if (t.orbit) {
			var e = t.orbit;
			e.angle += e.speed;
			t.x = e.distance * Math.cos(e.angle) + e.planet.x;
			t.y = e.distance / View.tilt * Math.sin(e.angle) + e.planet.y;
		}

	}
	t.render = function() {
		renderTrail(t);
	}
	orbitals.push(t);
	return t;
};

function sun(color, size, x, y) {
	var t = Orbital(color, size, x, y, null, null, null, null);
	t.name = t.type = 'the sun';
	t.isSun = true;
	return t;
}

function planet(color, size, orbit, distance, speed, angle) {
	if (angle === UNDEF) angle = 0;
	var t = Orbital(color, size, 0, 0, orbit, distance + size / 2, speed, angle);
	t.name = t.type = 'planet';
	t.update = extend(t.update, function() {

	})
	return t;
}

function createStation(what) {
	window[what]()
}

function miningStation(orbit) {
	var angle = splitToMax(miningStation.max, orbit, coms);
	if (angle === UNDEF)
		return;
	var t = Orbital(getHSL(212, 100, 97), 2, 0, 0, orbit, orbit.size * 3, -0.005, null);
	t.name = t.type = 'mining station';
	t.update = extend(t.update, function() {
		base.minerals += base.mineRate;
	})
	return t;
}

miningStation.max = 4;

function satellite(orbit) {
	var angle = splitToMax(satellite.max, orbit, coms);
	if (angle === UNDEF)
		return;
	var t = Orbital(getHSL(160, 100, 50), 2, 0, 0, orbit, orbit.size * 5, 0.01, angle);
	t.name = t.type = 'satellite';
	t.index = coms.length;
	coms.push(t);
	return t;
}

satellite.max = 3;
satellite.create = function() {

}

function defenseStation(orbit) {
	var angle = splitToMax(defenseStation.max, orbit, def);
	if (angle === UNDEF)
		return;
	var t = Orbital(getHSL(33, 100, 50), 2, 0, 0, orbit, orbit.size * 7, 0.005, angle);
	t.name = t.type = 'defense platform';
	t.index = def.length;
	def.push(t);
	return t;
}

defenseStation.max = 2;
