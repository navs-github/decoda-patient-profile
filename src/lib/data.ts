import patientData from "../../patient_data/patient.json"
import alertsData from "../../patient_data/alerts.json"
import chargesData from "../../patient_data/charges.json"
import doctorsNotesData from "../../patient_data/doctors_notes.json"
import eventsData from "../../patient_data/events.json"
import memosData from "../../patient_data/memos.json"
import paymentMethodsData from "../../patient_data/payment_methods.json"

import type {
    Patient,
    Alert,
    Charge,
    DoctorsNote,
    Event,
    Memo,
    PaymentMethod,
} from "./types"

const getDataArray = <T>(data: { data: T[] } | T[]): T[] => {
    return Array.isArray(data) ? data : data.data
}

export const getPatient = (): Patient => {
    return patientData as Patient
}

export const getAlerts = (): Alert[] => {
    return getDataArray(alertsData)
}

export const getCharges = (): Charge[] => {
    return getDataArray(chargesData)
}

export const getDoctorsNotes = (): DoctorsNote[] => {
    return getDataArray(doctorsNotesData)
}

export const getEvents = (): Event[] => {
    return getDataArray(eventsData)
}

export const getMemos = (): Memo[] => {
    return getDataArray(memosData)
}

export const getPaymentMethods = (): PaymentMethod[] => {
    return getDataArray(paymentMethodsData)
}

export const formatDate = (dateString: string, showTime: boolean = false): string => {
    const date = new Date(dateString)
    if (showTime) {
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
    }
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export const formatMaritalStatus = (status: string): string => {
    return status.charAt(0) + status.slice(1).toLowerCase()
}

export const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    return age
} 
