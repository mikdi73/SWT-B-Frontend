import { FC } from "react"
import { DayOfWeek, EventSchedule } from "../models/AngebotType"

type ScheduleSectionProps = {
    eventSchedule: EventSchedule
    startDate: string // ISO-Datum, z.B. "2025-07-28"
    endDate: string   // ISO-Datum, z.B. "2025-08-08"
}

// Für schöne Bezeichnungen
const dayNames: Record<DayOfWeek, string> = {
    MONDAY:    "Montag",
    TUESDAY:   "Dienstag",
    WEDNESDAY: "Mittwoch",
    THURSDAY:  "Donnerstag",
    FRIDAY:    "Freitag",
    SATURDAY:  "Samstag",
    SUNDAY:    "Sonntag",
}

const daysOfWeek: DayOfWeek[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
]

const formatDate = (isoDate: string) => {
    try {
        return new Date(isoDate).toLocaleDateString('de-DE', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        })
    } catch {
        return isoDate
    }
}

const ScheduleSection: FC<ScheduleSectionProps> = ({ eventSchedule, startDate, endDate}) => {
    return (
        <section className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-green-600 mb-4">
                Terminplan
            </h3>
            {(startDate && endDate) &&
                <div className="text-sm text-gray-600 mb-4">
                Zeitraum: {formatDate(startDate)} – {formatDate(endDate)}
            </div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {daysOfWeek.map(day => {
                    const entry = eventSchedule[day]
                    return (
                        <div
                            key={day}
                            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                        >
              <span className="font-medium text-green-600">
                {dayNames[day]}
              </span>
                            <span className="text-sm text-gray-700">
                {entry
                    ? `${entry.startTime.slice(0, 5)} – ${entry.endTime.slice(0, 5)}`
                    : "–"}
              </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ScheduleSection
