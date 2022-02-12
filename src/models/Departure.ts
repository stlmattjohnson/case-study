export default interface Departure {
  actual?: boolean;
  trip_id?: string | null;
  stop_id: number;
  departure_text?: string | null;
  departure_time?: number;
  description?: string | null;
  gate?: string | null;
  route_id: string;
  route_short_name?: string | null;
  direction_id: number;
  direction_text?: string | null;
  terminal?: string | null;
  schedule_relationship?: string | null;
}
