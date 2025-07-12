// OfferForm.tsx
import { useForm, Controller, FormProvider,Path } from 'react-hook-form';
import Select from 'react-select';
import {
    TARGET_GROUP_OPTIONS,
    OFFER_TYPE_OPTIONS,
    FILTER_OPTIONS,
    LANGUAGE_OPTIONS,
    AngebotFormValues,
} from '../models/AngebotType';
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router";


export interface OfferFormProps {
    initialValues?: AngebotFormValues;
    onSubmit: (data: AngebotFormValues) => void;
    updateOffer: boolean
}

type Weekday = keyof AngebotFormValues['eventSchedule'];
const WEEKDAYS: Weekday[] = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
];


export default function AngebotFormular({ initialValues, onSubmit, updateOffer }: OfferFormProps) {

    const navigate = useNavigate();
    const methods = useForm<AngebotFormValues>({
        defaultValues: initialValues,
    });

    const { register, control, handleSubmit, watch } = methods;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-32 p-6 max-w-3xl mx-auto">
                <div className="flex items-center w-full">
                    <h1 className="flex-1 text-center font-semibold m-0 text-2xl">
                        {updateOffer ? ("Bearbeiten sie ihr Angebot hier"): ("Geben Sie hier alle Informationen zu ihrer Aktivität an")}
                    </h1>
                </div>
                <button
                    className="cursor-pointer font-medium"
                    onClick={() => navigate("/user")}
                >
                    <ArrowLeft size={26}/>
                </button>
                {/* Abschnitt: Basisdaten */}
                <section className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Basisdaten</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input {...register('name', {required: true})} placeholder="Name des Angebots"
                               className="border p-2 rounded"/>
                        <label className={"flex flex-row text-xl gap-2 items-center"}>
                            PLZ
                            <input {...register('postalCode', {valueAsNumber: true})} placeholder="PLZ"
                                   className="border p-2 rounded w-full"/>
                        </label>
                        <input {...register('street')} placeholder="Straße"
                               className="border p-2 rounded col-span-1 md:col-span-2"/>
                        <input {...register('city')} placeholder="Stadt"
                               className="border p-2 rounded col-span-1 md:col-span-2"/>
                    </div>
                </section>

                {/* Abschnitt: Typen & Zielgruppen */}
                <section className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Typen & Zielgruppen</h2>
                    <Controller
                        control={control}
                        name="offerTypes"
                        render={({field}) => {
                            const selectedOptions = OFFER_TYPE_OPTIONS.filter(opt => field.value.includes(opt.value));
                            return (
                                <Select
                                    options={OFFER_TYPE_OPTIONS}
                                    placeholder={"Typ der Aktivität"}
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
                        render={({field}) => {
                            const selectedOptions = TARGET_GROUP_OPTIONS.filter(opt => field.value.includes(opt.value));
                            return (
                                <Select
                                    options={TARGET_GROUP_OPTIONS}
                                    placeholder={"Zielgruppe"}
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
                    <div className="flex flex-col gap-2 w-fullitems-center mb-4 md:flex-row">
                        <label className="flex items-center">
                            <input type="checkbox" {...register('recurring')} className="mr-2"/>
                            Wiederkehrend
                        </label>
                        <input type="date" {...register('startDate')} className="border p-2 rounded"/>
                        <input type="date" {...register('endDate')} className="border p-2 rounded"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {WEEKDAYS.map((day) => (
                            <div key={day}>
                                <h3 className="font-medium mb-2">{day}</h3>
                                <div className="flex space-x-2">
                                    <input
                                        type="time"
                                        {...register(
                                            `eventSchedule.${day}.startTime` as Path<AngebotFormValues>
                                        )}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="time"
                                        {...register(
                                            `eventSchedule.${day}.endTime` as Path<AngebotFormValues>
                                        )}
                                        className="border p-2 rounded"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Abschnitt: Registrierung & Kosten */}
                <section className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Registration & Kosten</h2>
                    <label className="flex items-center mb-4">
                        <input type="checkbox" {...register('registrationRequired')} className="mr-2"/>
                        Registrierung erforderlich
                    </label>
                    <label className="flex flex-col gap-2">
                        Kosten für die Registrierung
                        <input type="number" step="0.01" {...register('cost', {valueAsNumber: true})}
                               placeholder="Kosten"
                               className="border p-2 rounded"/>

                    </label>
                </section>

                {/* Abschnitt: Filter, Alter & Sprache */}
                <section className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Filter, Alter & Sprache</h2>
                    <Controller
                        control={control}
                        name="filters"
                        render={({field}) => {
                            const selected = FILTER_OPTIONS.filter(opt => field.value.includes(opt.value));
                            return (
                                <Select
                                    options={FILTER_OPTIONS}
                                    placeholder={"Filter Optionen"}
                                    isMulti
                                    value={selected}
                                    onChange={opts => field.onChange(opts.map(o => o.value))}
                                    className="mb-4"
                                />
                            );
                        }}
                    />
                    <div className="flex flex-col gap-2 md:flex-row mb-4">
                        <label className={"flex flex-col"}>
                            Minimum Alter
                            <input type="number" {...register('minAge', {valueAsNumber: true})}
                                   placeholder="Mindestalter"
                                   className="border p-2 rounded"/>
                        </label>
                        <label className={"flex flex-col"}>
                            Maximum Alter
                            <input type="number" {...register('maxAge', {valueAsNumber: true})}
                                   placeholder="Maximalalter"
                                   className="border p-2 rounded"/>
                        </label>
                    </div>
                    <Controller
                        control={control}
                        name="languages"
                        render={({field}) => {
                            const selected = LANGUAGE_OPTIONS.filter(opt => field.value.includes(opt.value));
                            return (
                                <Select
                                    options={LANGUAGE_OPTIONS}
                                    placeholder={"Sprache"}
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
                    <textarea {...register('additionalInformation')} rows={4} placeholder="Zusätzliche Hinweise"
                              className="w-full border p-2 rounded"/>
                </section>

                <button type="submit" onClick={handleSubmit(onSubmit)}
                        className="bg-green-600 text-white py-2 px-6 rounded shadow hover:bg-green-800 transition">
                    {updateOffer ? ("Angebot bearbeiten"): ("Angebot erstellen")}
                </button>
            </form>
        </FormProvider>
    );
}