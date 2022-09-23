export class CreatePlaceDTO {
    id: string;

    name: string;

    location: Location;
}

export class Location {
    latitude: number;
    longitude: number;
}
