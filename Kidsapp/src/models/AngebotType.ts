export const TARGET_GROUP_OPTIONS = [
    { value: 'KIDS', label: 'Kids' },
    { value: 'TEENAGERS', label: 'Jugendliche' },
    { value: 'PARENTS', label: 'Eltern' },
]

export const OFFER_TYPE_OPTIONS = [
    { value: 'COURSE_WORKSHOP', label: 'Kurs/Workshop' },
    { value: 'SEMINAR', label: 'Seminar' },
    { value: 'EVENT', label: 'Event' },
    { value: 'CONSULTATION', label: 'Beratung' },
    { value: 'MEDICAL_CONSULTATION', label: 'Medizinische Beratung' },
    { value: 'ONLINE_OFFER', label: 'Online Angebot' },
    { value: 'OTHER', label: 'Anderes' },
]

export const FILTER_OPTIONS = [
    { value: 'YOUTH_CENTERS', label: 'Jugendzentren' },
    { value: 'HOLIDAY_OFFERS', label: 'Ferienangebote' },
    { value: 'PLAY_LEARN_AND_EXPERIENCE', label: 'Spielen & Lernen' },
    { value: 'SPORT_AND_EXERCISE', label: 'Sport & Bewegung' },
    { value: 'ENGAGEMENT_AND_VOLUNTEERING', label: 'Engagement & Freiwilligenarbeit' },
    { value: 'CREATIVITY_AND_CULTURE', label: 'Kreativität & Kultur' },
    { value: 'PARKS_AND_PLAYGROUNDS', label: 'Parks & Spielplätze' },
    { value: 'FESTIVALS_AND_MARKETS', label: 'Festivals & Märkte' },
    { value: 'OTHER_OFFERS_LEISURE', label: 'Weitere Freizeitangebote' },
    { value: 'DAYCARE', label: 'Tagesbetreuung' },
    { value: 'EMERGENCY_CARE', label: 'Notfallbetreuung' },
    { value: 'BABYSITTER', label: 'Babysitter' },
    { value: 'OTHER_OFFERS_CARE', label: 'Weitere Betreuungsangebote' },
]

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