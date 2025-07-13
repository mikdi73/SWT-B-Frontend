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

export type OfferStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

export interface AngebotFormValues {
    offerId?: number;
    name: string;
    street: string;
    city: string;
    postalCode: number;
    offerTypes: string[];
    targetGroups: string[];
    recurring: boolean;
    startDate: string;
    endDate: string;
    eventSchedule: Record<
        'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY',
        { startTime: string; endTime: string }
    >;
    registrationRequired: boolean;
    additionalInformation: string;
    cost: number;
    filters: string[];
    minAge: number;
    maxAge: number;
    languages: string[];
    status?: OfferStatus;
    providerName?: string;
    providerId?: number;
}

export type Weekday = keyof AngebotFormValues['eventSchedule'];

export const LANGUAGE_OPTIONS = [
    {value: 'Deutsch', label: 'Deutsch'},
    {value: 'Englisch', label: 'Englisch'},
    // Weitere Sprachen...
];

// getLabel um das Label Text von den Optionen zu kriegen, anstatt den Valuestring
export const getLabel = (
    value: string,
    options: { value: string; label: string }[]
): string => {
    const opt = options.find(o => o.value === value)
    return opt ? opt.label : value
}