import { Injectable } from '@nestjs/common';
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {CreatePlaceDTO} from "./dto/create-place.dto";
import {placeIndex} from "../constant/place.constant";

@Injectable()
export class PlaceService {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}

    async ping() {
        return await this.elasticsearchService.ping()
    }

    async createPlaceIndex() {
        const result = await this.elasticsearchService.indices.create({
            index: placeIndex,
            mappings: {
                properties: {
                    name: {
                        type: "text"
                    },
                    pin: {
                        properties: {
                            location: {
                                type: "geo_point"
                            }
                        }
                    }
                }
            }
        })
        console.log(result)
        return true
    }

     async createPlace(createPlaceDTO: CreatePlaceDTO) {
         const createPlaceResult = await this.elasticsearchService.index({
            index: 'place',
            id: createPlaceDTO.id,
            document: {
                name: createPlaceDTO.name,
                pin : {
                    location: {
                        lat: createPlaceDTO.location.latitude,
                        lon: createPlaceDTO.location.longitude
                    }
                }
            }
        });
        return true
    }

    async findByBoundingBox() {
        const result = await this.elasticsearchService.search({
            index: 'place',
            query: {
                bool: {
                    must: {
                        match_all: {}
                    },
                    filter: {
                        geo_bounding_box: {
                            'pin.location': {
                                top_left: {
                                    "lat": 40.73,
                                    "lon": -74.1
                                },
                                bottom_right: {
                                    "lat": 40.01,
                                    "lon": -71.12
                                }
                            }
                        }
                    }
                }
            }
        })
        return result.hits
    }

    // 데이터가 없으면 에러ㅠㅠ
    async findByID(id: string) {
        return await this.elasticsearchService.get({
            index: placeIndex,
            id
        })
    }
}
