import maplibregl from "maplibre-gl";

function renderMap(container: HTMLElement) {
	void import("maplibre-gl/dist/maplibre-gl.css");
	void import("./map.css");

	const map_container = document.createElement("div");
	container.appendChild(map_container);
	map_container.classList.add("map");

	const map = new maplibregl.Map({
		center: [280, 25],
		container: map_container,
		style: {
			"layers": [
				{
					"id": "simple-tiles",
					"type": "raster",
					"source": "raster-tiles",
					"attribution": "© OpenStreetMap contributors",
				}
			],
			"projection": {
				"type": "globe"
			},
			"sources": {
				"raster-tiles": {
					"type": "raster",
					"tiles": ["https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"]
				}
			},
			version: 8
		},
		zoom: 5.5
	});

	return map;
}

function renderStates(map: HTMLElement) {
	map.on("move", async event => {
		const zoom = map.getZoom();
		if (zoom < 5.5) return;

		const { _ne: ne, _sw: sw } = map.getBounds();

		const lat_min = Math.min(ne.lat, sw.lat);
		const lng_min = Math.min(ne.lng, sw.lng);

		const lat_max = Math.max(ne.lat, sw.lat);
		const lng_max = Math.max(ne.lng, sw.lng);

		const request = await fetch(`https://opensky-network.org/api/states/all?lamin=${lat_min}&lomin=${lng_min}&lamax=${lat_max}&lomax=${lng_max}`);

		let states = [];

		try {
			states = await request.json();
		} catch (error) {
			console.warn("[map/states] could not parse states data returned by opensky");
		}

		console.log(states);
	});
}

function updateCanvasSize() {
	const canvas = document.getElementById("map-canvas");
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
}

function mapView(main: HTMLElement) {
	const map = renderMap(main);

	const canvas = document.createElement("canvas");
	main.appendChild(canvas);
	canvas.id = "map-canvas";

	window.addEventListener("resize", updateCanvasSize);
	updateCanvasSize();

	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(100, 100, 20, 0, Math.PI * 2, false);
	ctx.strokeStyle = "#ff0";
	ctx.stroke();

	map.on("load", () => {
		const { _ne: ne, _sw: sw } = map.getBounds();

		map.addSource("canvas-source", {
			animate: false,
			canvas: "map-canvas",
			coordinates: [
				[ne.lng, ne.lat],
				[ne.lng, sw.lat],
				[sw.lng, ne.lat],
				[sw.lng, sw.lat]
			],
			type: "canvas",
		});

		map.addLayer({
			id: "canvas-layer",
			source: "canvas-source",
			type: "raster"
		});
	});

	renderStates(map);
}

export default mapView;
