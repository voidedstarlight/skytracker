type deinit_callback = () => void;

const deinit_sequence: Array<deinit_callback> = [];

function registerDeinit(callback: deinit_callback) {
	deinit_sequence.push(callback);
}

function deinitAll() {
	deinit_sequence.forEach(callback => callback());
}

export { deinitAll };
export default registerDeinit;
