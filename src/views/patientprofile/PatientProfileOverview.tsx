"use client"

import {
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
                            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {upcomingAppointments.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">
                                    No upcoming appointments
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingAppointments.map((appointment) => (
                                        <div key={appointment.id} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {appointment.title || "Appointment"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {appointment.start ? formatDate(appointment.start) : "No date set"}
                                                </p>
                                                {appointment.appointment?.reason && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Reason: {appointment.appointment.reason}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-4 flex justify-center">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <PlusCircle className="h-4 w-4 mr-1" />
                                    Schedule Appointment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Active Prescriptions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activePrescriptions.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">
                                    No active prescriptions
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activePrescriptions.map((medication) => (
                                        <div key={medication.id} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Stethoscope className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {medication.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {medication.dosage} • {medication.frequency}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Started: {formatDate(medication.startDate)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-4 flex justify-center">
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <FilePenLine className="h-4 w-4 mr-1" />
                                    Request Prescription
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Billing Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Total Outstanding</span>
                                <span className="text-lg font-semibold">${totalOutstanding.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Payment Methods</span>
                                <span className="text-sm text-gray-900">
                                    {paymentMethods.length} {paymentMethods.length === 1 ? "method" : "methods"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Last Payment</span>
                                <span className="text-sm text-gray-900">
                                    {charges.length > 0 && charges[0].createdDate ? formatDate(charges[0].createdDate) : "No payments"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                <CreditCard className="h-4 w-4 mr-1" />
                                Make Payment
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-auto py-3">
                                <div className="flex flex-col items-center">
                                    <User className="h-5 w-5 mb-1" />
                                    <span className="text-xs">Update Profile</span>
                                </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-3">
                                <div className="flex flex-col items-center">
                                    <CircleDollarSign className="h-5 w-5 mb-1" />
                                    <span className="text-xs">View Billing</span>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 
