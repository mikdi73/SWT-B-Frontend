import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

 export interface OfferFormValues {
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
}

 // Optionen für Select-Felder
 const OFFER_TYPE_OPTIONS = [
     { value: 'COURSE_WORKSHOP', label: 'Kurs/Workshop' },
     { value: 'SEMINAR', label: 'Seminar' },
     // Weitere Typen...
 ];
 const TARGET_GROUP_OPTIONS = [
     { value: 'KIDS', label: 'Kids' },
     { value: 'TEENS', label: 'Teens' },
     // Weitere Gruppen...
 ];
 const FILTER_OPTIONS = [
     { value: 'PLAY_LEARN_AND_EXPERIENCE', label: 'Spielen & Lernen' },
     // Weitere Filter...
 ];
 const LANGUAGE_OPTIONS = [
     { value: 'Deutsch', label: 'Deutsch' },
     { value: 'Englisch', label: 'Englisch' },
     // Weitere Sprachen...
 ];

export default function NeueAktivität() {

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<OfferFormValues>({
        defaultValues: {
            name: '', street: '', city: '', postalCode: 0,
            offerTypes: [], targetGroups: [], recurring: false,
            startDate: '', endDate: '',
            eventSchedule: {
                MONDAY: { startTime: '', endTime: '' },
                TUESDAY: { startTime: '', endTime: '' },
                WEDNESDAY: { startTime: '', endTime: '' },
                THURSDAY: { startTime: '', endTime: '' },
                FRIDAY: { startTime: '', endTime: '' },
                SATURDAY: { startTime: '', endTime: '' },
                SUNDAY: { startTime: '', endTime: '' },
            },
            registrationRequired: false, additionalInformation: '', cost: 0,
            filters: [], minAge: 0, maxAge: 0, languages: [],
        }
    });

    const onSubmit = (data: OfferFormValues) => {
        console.log('Form data:', data);
        // Hier POST-Request an /api/offer mit JWT
    };

    // Für bedingte Anzeige der Schedule
    const isRecurring = watch('recurring');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 max-w-3xl mx-auto">
            <h1>Neue Aktivität erstellen</h1>
            {/* Abschnitt: Basisdaten */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Basisdaten</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input {...register('name', { required: true })} placeholder="Name des Angebots" className="border p-2 rounded" />
                    <input {...register('postalCode', { valueAsNumber: true })} type="number" placeholder="PLZ" className="border p-2 rounded" />
                    <input {...register('street')} placeholder="Straße" className="border p-2 rounded col-span-1 md:col-span-2" />
                    <input {...register('city')} placeholder="Stadt" className="border p-2 rounded col-span-1 md:col-span-2" />
                </div>
            </section>

            {/* Abschnitt: Typen & Zielgruppen */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Typen & Zielgruppen</h2>
                <Controller
                    control={control}
                    name="offerTypes"
                    render={({ field }) => {
                        const selectedOptions = OFFER_TYPE_OPTIONS.filter(opt => field.value.includes(opt.value));
                        return (
                            <Select
                                options={OFFER_TYPE_OPTIONS}
                                isMulti
                                getOptionLabel={opt => opt.label}
                                getOptionValue={opt => opt.value}
                                value={selectedOptions}
                                onChange={opts => field.onChange(opts.map(o => o.value))}
                                className="mb-4"
                            />
                        );
                    }}
                />
                <Controller
                    control={control}
                    name="targetGroups"
                    render={({ field }) => {
                        const selectedOptions = TARGET_GROUP_OPTIONS.filter(opt => field.value.includes(opt.value));
                        return (
                            <Select
                                options={TARGET_GROUP_OPTIONS}
                                isMulti
                                getOptionLabel={opt => opt.label}
                                getOptionValue={opt => opt.value}
                                value={selectedOptions}
                                onChange={opts => field.onChange(opts.map(o => o.value))}
                            />
                        );
                    }}
                />
            </section>

            {/* Abschnitt: Wiederholung & Zeitraum */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Zeitraum & Zeitplan</h2>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="flex items-center">
                        <input type="checkbox" {...register('recurring')} className="mr-2" />
                        Wiederkehrend
                    </label>
                    <input type="date" {...register('startDate')} className="border p-2 rounded" />
                    <input type="date" {...register('endDate')} className="border p-2 rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(watch('eventSchedule')).map(([day]) => (
                        <div key={day}>
                            <h3 className="font-medium mb-2">{day}</h3>
                            <div className="flex space-x-2">
                                <input type="time" {...register(`eventSchedule.${day}.startTime` as const)} className="border p-2 rounded" />
                                <input type="time" {...register(`eventSchedule.${day}.endTime` as const)} className="border p-2 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Abschnitt: Registrierung & Kosten */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Registration & Kosten</h2>
                <label className="flex items-center mb-4">
                    <input type="checkbox" {...register('registrationRequired')} className="mr-2" />
                    Registrierung erforderlich
                </label>
                <input type="number" step="0.01" {...register('cost', { valueAsNumber: true })} placeholder="Kosten" className="border p-2 rounded" />
            </section>

            {/* Abschnitt: Filter, Alter & Sprache */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Filter, Alter & Sprache</h2>
                <Controller
                    control={control}
                    name="filters"
                    render={({ field }) => {
                        const selected = FILTER_OPTIONS.filter(opt => field.value.includes(opt.value));
                        return (
                            <Select
                                options={FILTER_OPTIONS}
                                isMulti
                                value={selected}
                                onChange={opts => field.onChange(opts.map(o => o.value))}
                                className="mb-4"
                            />
                        );
                    }}
                />
                <div className="flex space-x-4 mb-4">
                    <input type="number" {...register('minAge', { valueAsNumber: true })} placeholder="Mindestalter" className="border p-2 rounded" />
                    <input type="number" {...register('maxAge', { valueAsNumber: true })} placeholder="Maximalalter" className="border p-2 rounded" />
                </div>
                <Controller
                    control={control}
                    name="languages"
                    render={({ field }) => {
                        const selected = LANGUAGE_OPTIONS.filter(opt => field.value.includes(opt.value));
                        return (
                            <Select
                                options={LANGUAGE_OPTIONS}
                                isMulti
                                value={selected}
                                onChange={opts => field.onChange(opts.map(o => o.value))}
                            />
                        );
                    }}
                />
            </section>

            {/* Abschnitt: Zusätzliche Informationen */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Zusätzliche Informationen</h2>
                <textarea {...register('additionalInformation')} rows={4} placeholder="Zusätzliche Hinweise" className="w-full border p-2 rounded" />
            </section>

            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded shadow hover:bg-blue-700 transition">
                Angebot erstellen
            </button>
        </form>
    )
}