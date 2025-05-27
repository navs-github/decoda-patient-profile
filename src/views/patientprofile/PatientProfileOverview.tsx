"use client"

import {
    CalendarPlus,
    CircleDollarSign,
    CreditCard,
    FilePenLine,
    PlusCircle,
    Stethoscope,
    User,
    Calendar,
    Clock,
    Pencil,
    Scale,
    Ruler,
    HeartPulse,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import TextDetail from "@/components/ui/TextDetail"

import {
    getPatient,
    getCharges,
    getEvents,
    getPaymentMethods,
    formatDate,
} from "@/lib/data"

export default function PatientProfileOverview() {
    const patient = getPatient()
    const charges = getCharges()
    const events = getEvents()
    const paymentMethods = getPaymentMethods()

    const upcomingAppointments = events
        .filter((event) => event.start && new Date(event.start) > new Date())
        .sort((a, b) => {
            if (!a.start || !b.start) return 0;
            return new Date(a.start).getTime() - new Date(b.start).getTime();
        })
        .slice(0, 3)

    const activePrescriptions = patient.medications?.filter((med) => med.active) || []

    const totalOutstanding = charges.reduce((sum, charge) => sum + (charge.totalOutstanding || 0), 0)

    const getLatestMeasurement = (type: string) => {
        return patient.measurements
            ?.filter(m => m.type === type)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    }

    const latestWeight = getLatestMeasurement("WEIGHT")
    const latestHeight = getLatestMeasurement("HEIGHT")
    const latestBP = getLatestMeasurement("BLOOD_PRESSURE")

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="md:col-span-2">
                        <CardHeader className="">
                            <CardTitle className="text-lg">Health History</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <TextDetail
                                    label="Medical History"
                                    detail={
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(patient.medicalHistory) && patient.medicalHistory.length > 0 ? (
                                                patient.medicalHistory.map((condition) => (
                                                    <Badge key={condition} variant="secondary">
                                                        {condition}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </div>
                                    }
                                />
                                <TextDetail
                                    label="Known Allergies"
                                    detail={
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(patient.allergies) && patient.allergies.length > 0 ? (
                                                patient.allergies.map((allergy) => (
                                                    <Badge key={allergy} variant="destructive">
                                                        {allergy}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </div>
                                    }
                                />
                                <TextDetail
                                    label="Family History"
                                    detail={
                                        <div className="flex flex-wrap gap-1">
                                            {Array.isArray(patient.familyHistory) && patient.familyHistory.length > 0 ? (
                                                patient.familyHistory.map((condition) => (
                                                    <Badge key={condition} variant="outline">
                                                        {condition}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </div>
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Vitals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                                    <Scale className="h-6 w-6 text-blue-600 mb-2" />
                                    <span className="text-sm text-gray-500">Weight</span>
                                    <span className="text-xl font-semibold">
                                        {latestWeight ? `${latestWeight.value} ${latestWeight.unit}` : "N/A"}
                                    </span>
                                    {latestWeight && (
                                        <span className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatDate(latestWeight.date)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                                    <Ruler className="h-6 w-6 text-blue-600 mb-2" />
                                    <span className="text-sm text-gray-500">Height</span>
                                    <span className="text-xl font-semibold">
                                        {latestHeight ? `${latestHeight.value} ${latestHeight.unit}` : "N/A"}
                                    </span>
                                    {latestHeight && (
                                        <span className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatDate(latestHeight.date)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                                    <HeartPulse className="h-6 w-6 text-blue-600 mb-2" />
                                    <span className="text-sm text-gray-500">Blood Pressure</span>
                                    <span className="text-xl font-semibold">
                                        {latestBP ? `${latestBP.value} ${latestBP.unit}` : "N/A"}
                                    </span>
                                    {latestBP && (
                                        <span className="text-xs text-gray-500 mt-1 flex items-center justify-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatDate(latestBP.date)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Record New Vitals
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Active Prescriptions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-3">
                                {activePrescriptions.length === 0 ? (
                                    <div className="text-center text-gray-500 py-6">
                                        <Stethoscope className="mx-auto mb-2 h-6 w-6 text-blue-200" />
                                        <div className="font-medium">No active prescriptions</div>
                                    </div>
                                ) : (
                                    <>
                                        {activePrescriptions.slice(0, 3).map((medication) => (
                                            <div key={medication.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-sm">{medication.name}</p>
                                                    <p className="text-xs text-gray-600">{medication.frequency}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {medication.dosage && <span>{medication.dosage}</span>}
                                                        {medication.startDate && (
                                                            <span>
                                                                {medication.dosage ? ' • ' : ''}Started {formatDate(medication.startDate, false)}
                                                            </span>
                                                        )}
                                                        {medication.endDate && (
                                                            <span>
                                                                {' • '}Scheduled to end {formatDate(medication.endDate, false)}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    Refill
                                                </Button>
                                            </div>
                                        ))}
                                        {activePrescriptions.length > 3 && (
                                            <div className="text-center text-xs text-gray-500">
                                                +{activePrescriptions.length - 3} more prescriptions
                                            </div>
                                        )}
                                        <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm mt-2">
                                            <Stethoscope className="h-4 w-4 mr-1" />
                                            View all prescriptions
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="default" className="h-16 flex flex-col items-center justify-center space-y-1 bg-blue-600 hover:bg-blue-700">
                                <PlusCircle className="h-5 w-5" />
                                <span className="text-xs">New Doctor&apos;s Note</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <FilePenLine className="h-5 w-5" />
                                <span className="text-xs">Create Memo</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <CalendarPlus className="h-5 w-5" />
                                <span className="text-xs">Schedule Appointment</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                                <CircleDollarSign className="h-5 w-5" />
                                <span className="text-xs">Charge Patient</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {upcomingAppointments.length === 0 ? (
                            <div className="text-center text-gray-500 py-6">
                                <Calendar className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                                <div className="font-medium">No upcoming events</div>
                            </div>
                        ) : (
                            <>
                                {upcomingAppointments.map((appointment) => (
                                    <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg mb-3">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Calendar className="h-4 w-4 text-gray-600" />
                                            <span className="font-medium text-gray-900">{appointment.title || "Untitled Appointment"}</span>
                                        </div>
                                        <div className="space-y-1.5 text-sm text-gray-700">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{appointment.start ? formatDate(appointment.start, false) : "No date"}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-4 w-4" />
                                                <span>
                                                    {appointment.start && appointment.end ?
                                                        `${new Date(appointment.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${new Date(appointment.end).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                                                        : "No time specified"}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4" />
                                                <span>Dr. {appointment.organizer?.lastName || "Unknown"}</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                                                Reschedule
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                                                Send Reminder
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Separator className="my-4" />
                                <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    View in Schedule
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Financials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600 mb-1">Outstanding Balance</p>
                            <p className="text-2xl font-bold text-red-700">${totalOutstanding.toFixed(2)}</p>
                        </div>
                        <div className="space-y-2">
                            {charges
                                .filter((charge) => (charge.totalOutstanding || 0) > 0)
                                .map((charge) => (
                                    <div key={charge.id} className="flex justify-between text-sm">
                                        <span>{charge.description || "Unnamed charge"}</span>
                                        <span className="text-red-600">${(charge.totalOutstanding || 0).toFixed(2)} remaining</span>
                                    </div>
                                ))}
                        </div>
                        <Separator />
                        {paymentMethods.length > 0 && paymentMethods[0].brand && paymentMethods[0].last4 && (
                            <Button className="w-full">
                                <CreditCard className="h-4 w-4 mr-1" />
                                Charge {paymentMethods[0].brand} **** {paymentMethods[0].last4}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
