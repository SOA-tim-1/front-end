import { Coordinate } from "../../tour-execution/model/coordinate";

export enum EncounterExecutionStatus {
    Active = 0,
    Completed = 1,
    Abandoned = 2
}

export interface EncounterExecution {
    id: string;
    encounterId: string;
    touristId: number;
    status: EncounterExecutionStatus;
    lastActivity: Date;
    locationEntryTimestamp?: Date;
    lastPosition: Coordinate;
}