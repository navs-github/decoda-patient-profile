"use client"

import { User, Calendar, Phone, Mail, MapPin, Pencil } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import TextDetail from "@/components/ui/TextDetail"

interface PatientInfoCardProps {
    patient: {
        fullName: string
        personalInfo: {
            dateOfBirth: {
                date: string
                age: number
            }
        }
        contactInfo: {
            phoneNumber: string
            email: string
        }
        address: {
            street: string
            street2: string | null
            city: string
            state: string
            zipCode: string
        }
    }
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-body-1">
                            <h2 className="text-title font-bold text-gray-900">
                                {patient.fullName}
                            </h2>
                        </CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TextDetail
                        label="Date of Birth"
                        labelIcon={<Calendar className="h-4 w-4 text-gray-500" />}
                        detail={
                            patient.personalInfo.dateOfBirth.date === "Not provided"
                                ? "Not provided"
                                : `${patient.personalInfo.dateOfBirth.date}${patient.personalInfo.dateOfBirth.age > 0 ? ` (Age ${patient.personalInfo.dateOfBirth.age})` : ""}`
                        }
                    />
                    <TextDetail
                        label="Phone Number"
                        labelIcon={<Phone className="h-4 w-4 text-gray-500" />}
                        detail={patient.contactInfo.phoneNumber}
                    />
                    <TextDetail
                        label="Email"
                        labelIcon={<Mail className="h-4 w-4 text-gray-500" />}
                        detail={patient.contactInfo.email}
                    />
                    <TextDetail
                        label="Address"
                        labelIcon={<MapPin className="h-4 w-4 text-gray-500" />}
                        detail={
                            (() => {
                                const { street, street2, city, state, zipCode } = patient.address;
                                const isAllMissing = [street, street2, city, state, zipCode].every(
                                    (val) => !val || val === "Not provided"
                                );
                                if (isAllMissing) return "Not provided";
                                return (
                                    <>
                                        {street}
                                        {street2 && <>, {street2}</>}
                                        <br />
                                        {city}, {state} {zipCode}
                                    </>
                                );
                            })()
                        }
                    />
                </div>
            </CardContent>
        </Card>
    )
} 
