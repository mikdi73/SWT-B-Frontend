
// Wochentage
export type DayOfWeek =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';

// Zeitspanne für einen Tag
export interface ScheduleEntry {
    startTime: string; // z.B. "09:00:00"
    endTime: string;   // z.B. "16:00:00"
}

// Terminplan; Tage können optional sein, wenn am Wochenende nichts passiert
export type EventSchedule = Partial<Record<DayOfWeek, ScheduleEntry>>;

// mögliche Angebots-Typen (ggf. um weitere Werte ergänzen)
export type OfferType = 'EVENT' | 'GROUP_OFFER';

// mögliche Zielgruppen
export type TargetGroup = 'KIDS';

// mögliche Filter-Keys (ggf. erweitern)
export type Filter = 'HOLIDAY_OFFERS' | 'PLAY_LEARN_AND_EXPERIENCE';

// Status eines Angebots
export type OfferStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

// Das eigentliche Interface
export interface Offer {
    offerId: number;
    name: string;
    street: string;
    city: string;
    postalCode: number;
    offerTypes: OfferType[];
    targetGroups: TargetGroup[];
    recurring: boolean;
    startDate: string; // ISO-Datum, z.B. "2025-07-28"
    endDate: string;   // ISO-Datum, z.B. "2025-08-08"
    eventSchedule: EventSchedule;
    registrationRequired: boolean;
    additionalInformation: string;
    cost: number;
    filters: Filter[];
    status: OfferStatus;
    minAge: number;
    maxAge: number;
    languages: string[];   // z.B. ["Deutsch"]
    providerName: string;  // z.B. "Jugendamt Fantasiestadt"
}