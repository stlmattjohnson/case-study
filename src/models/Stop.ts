export default interface Stop {
  place_code: string;
  stop_id: number;
  latitude: number;
  longitude: number;
  description?: string | null;
}
