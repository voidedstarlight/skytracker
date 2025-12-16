import db_pool from "./db";
import queries from "./queries.json";

function dateObject(input: string | undefined) {
	if (input) return new Date(input);

	return null;
}

function registerRoutes(server) {
	server.post("/A/flights/add", {
		schema: {
			body: {
				additionalProperties: false,
				type: "object",
				properties: {
					id: { type: "string" },
					userId: { type: "string" },
					flightNumber: { type: "string" },
					origin: { type: "string" },
					destination: { type: "string" },
					departureTerminal: { type: "string" },
					departureGate: { type: "string" },
					arrivalTerminal: { type: "string" },
					arrivalGate: { type: "string" },
					distance: { type: "number" },
					scheduledDepartureDate: { type: "string" },
					scheduledDepartureTime: { type: "string" },
					scheduledArrivalDate: { type: "string" },
					scheduledArrivalTime: { type: "string" },
					actualDepartureDate: { type: "string" },
					actualDepartureTime: { type: "string" },
					actualArrivalDate: { type: "string" },
					actualArrivalTime: { type: "string" },
					operatorName: { type: "string" },
					vendorName: { type: "string" },
					planeRegistration: { type: "string" },
					planeType: { type: "string" },
					cabin: { type: "string" },
					seat: { type: "string" },
					purpose: { type: "string" },
				},
				required: ["id", "userId"]
			}
		}
	}, async (request, reply) => {
		const query = queries.add;

		const data = [
			request.body.id,
			request.body.userId,
			request.body.flightNumber,
			request.body.origin,
			request.body.destination,
			request.body.departureTerminal,
			request.body.departureGate,
			request.body.arrivalTerminal,
			request.body.arrivalGate,
			request.body.distance,
			dateObject(request.body.scheduledDepartureDate),
			request.body.scheduledDepartureTime,
			dateObject(request.body.scheduledArrivalDate),
			request.body.scheduledArrivalTime,
			dateObject(request.body.actualDepartureDate),
			request.body.actualDepartureTime,
			dateObject(request.body.actualArrivalDate),
			request.body.actualArrivalTime,
			request.body.operatorName,
			request.body.vendorName,
			request.body.planeRegistration,
			request.body.planeType,
			request.body.cabin,
			request.body.seat,
			request.body.purpose,
		];

		void await db_pool.query(query, data);
		reply.send();
	});
}

export default registerRoutes;
