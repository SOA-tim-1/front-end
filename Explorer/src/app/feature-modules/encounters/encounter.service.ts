import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Encounter, EncounterMessage, EncounterStatistics } from "./model/encounters.model";
import { environment, gRPCenv } from "src/env/environment";
import { Observable } from "rxjs";
import { TextWrapper } from 'src/app/shared/model/text-wrapper.model';

@Injectable({
    providedIn: 'root'
})
export class EncounterService {

    constructor(private http: HttpClient) { }

    getAllEncounters(): Observable<EncounterMessage> {
        return this.http.get<EncounterMessage>(
            gRPCenv.apiHost + 'encounter')
    }

    getForCheckpoint(id: number): Observable<Encounter> {
        return this.http.get<Encounter>(
            environment.apiHost + `administration/encounter/checkpoint/${id}`)
    }

    getAllForCheckpoint(): Observable<PagedResults<Encounter>> {
        return this.http.get<PagedResults<Encounter>>(
            environment.apiHost + `administration/encounter/checkpoint/`)
    }

    getStatisticsForEncounter(encounterId: string): Observable<EncounterStatistics> {
        return this.http.get<EncounterStatistics>(
            environment.apiHost + `administration/encounter/statistics/${encounterId}`)
    }


    getActiveEncounters(): Observable<EncounterMessage> {
        return this.http.get<EncounterMessage>(
            gRPCenv.apiHost + 'encounter/active')
    }

    deleteEncounter(id: string): Observable<Encounter> {
        return this.http.delete<Encounter>(
            gRPCenv.apiHost + 'encounter/' + id);
    }

    addEncounter(encounter: Encounter): Observable<Encounter> {
        return this.http.post<Encounter>(
            gRPCenv.apiHost + 'encounter', encounter);
    }

    updateEncounter(encounter: Encounter): Observable<Encounter> {
        return this.http.put<Encounter>(
            gRPCenv.apiHost + 'encounter', encounter);
    }
}
