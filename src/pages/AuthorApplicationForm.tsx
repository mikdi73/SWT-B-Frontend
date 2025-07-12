import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useUser } from '../hooks/UserProvider'
import {ArrowLeft} from "lucide-react";

export interface AuthorApplicationValues {
    username: string
    userEmail: string
    firstName: string
    lastName: string
    institute: string
    phone: string
}

const AuthorApplicationForm: FC = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const {
        register,
        formState: { errors, isSubmitting }
    } = useForm<AuthorApplicationValues>({
        defaultValues: {
            username: user?.name || '',
            userEmail: user?.email || '',
            firstName: '',
            lastName: '',
            institute: '',
            phone: ''
        }
    })

    return (
        <div className={"w-full flex flex-col justify-center p-6"}>
            <div className={"w-full md:w-1/2 mx-auto"}>
                <button
                    className="cursor-pointer font-medium m-0"
                    onClick={() => navigate("/user")}
                >
                    <ArrowLeft size={26}/>
                </button>
            </div>
            <form
                className="w-full md:w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">

                <h2 className="text-2xl font-semibold text-green-600 text-center">Author-Antrag</h2>

                {/* Username (aus Context) */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <input
                        {...register('username')}
                        className="border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
                        value={user?.name}
                        disabled
                    />
                </div>

                {/* E-Mail (aus Context) */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">E-Mail</label>
                    <input
                        {...register('userEmail')}
                        className="border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
                        value={user?.email}
                        disabled
                    />
                </div>

                {/* Vorname */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Vorname</label>
                    <input
                        {...register('firstName', {required: 'Vorname ist erforderlich'})}
                        className="border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                        placeholder="Dein Vorname"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                {/* Nachname */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Nachname</label>
                    <input
                        {...register('lastName', {required: 'Nachname ist erforderlich'})}
                        className="border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                        placeholder="Dein Nachname"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                </div>

                {/* Institut / providerName */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Institut</label>
                    <input
                        {...register('institute', {required: 'Institut ist erforderlich'})}
                        className="border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                        placeholder="Name deiner Einrichtung"
                    />
                    {errors.institute && <p className="text-red-600 text-sm mt-1">{errors.institute.message}</p>}
                </div>

                {/* Telefonnummer */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Telefonnummer</label>
                    <input
                        {...register('phone', {
                            required: 'Telefonnummer ist erforderlich',
                            pattern: {value: /^\+?[0-9\s-]{7,20}$/, message: 'Ungültiges Telefonnummernformat'}
                        })}
                        className="border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                        placeholder="z.B. +49 123 456789"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                    {isSubmitting ? 'Sende...' : 'Antrag abschicken'}
                </button>
            </form>
        </div>
    )
}

export default AuthorApplicationForm
