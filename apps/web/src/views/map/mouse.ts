import requestUpdate, { graphicsStates } from "./canvas/update";

let selected_hex: string;

function pointerMove(map: maplibregl.Map, event: MouseEvent) {
	const { clientX, clientY } = event;
	const graphics_states = graphicsStates();

	const match = graphics_states.some(state => {
		if (
			state.x <= clientX && clientX <= state.x + 50
			&& state.y <= clientY && clientY <= state.y + 50
		) {
			selected_hex = state.hex;
			return true;
		}
	});

	if (match) requestUpdate(map, true);
}

function click(event: MouseEvent) {
	console.log("click");
}

export { click, pointerMove };
