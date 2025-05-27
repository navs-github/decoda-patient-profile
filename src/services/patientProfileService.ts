import { getPatient as getRawPatient, calculateAge, formatDate } from "@/lib/data"

export interface FormattedPatientInfo {
    id: string
    fullName: string
    contactInfo: {
        phoneNumber: string
        email: string
    }
    personalInfo: {
        dateOfBirth: {
            date: string
            age: number
        }
        maritalStatus: string
        gender: string
        employmentStatus: string
    }
    address: {
        street: string
        street2: string | null
        city: string
        state: string
        zipCode: string
        country: string
        isValid: boolean
    }
    guardian: {
        name: string | null
        phoneNumber: string | null
    }
    healthInfo: {
        allergies: string[]
        familyHistory: string[]
        medicalHistory: string[]
        prescriptions: string[]
        goalWeight: number
    }
    systemInfo: {
        isOnboardingComplete: boolean
        createdDate: string
        firebaseUid: string
    }
}

const formatMaritalStatus = (status?: string): string => {
    if (!status) return "Not specified"
    return status.charAt(0) + status.slice(1).toLowerCase()
}

const formatGender = (gender?: string): string => {
    if (!gender) return "Not specified"
    return gender.charAt(0) + gender.slice(1).toLowerCase()
}

const formatEmploymentStatus = (status?: string): string => {
    if (!status) return "Not specified"
    return status.charAt(0) + status.slice(1).toLowerCase()
}

export const getPatient = (): FormattedPatientInfo => {
    const rawPatient = getRawPatient()

    return {
        id: rawPatient.id,
        fullName: `${rawPatient.firstName || ""} ${rawPatient.lastName || ""}`.trim() || "Unnamed Patient",
        contactInfo: {
            phoneNumber: rawPatient.phoneNumber || "Not provided",
            email: rawPatient.email || "Not provided",
        },
        personalInfo: {
            dateOfBirth: {
                date: rawPatient.dateOfBirth ? formatDate(rawPatient.dateOfBirth) : "Not provided",
                age: rawPatient.dateOfBirth ? calculateAge(rawPatient.dateOfBirth) : 0,
            },
            maritalStatus: formatMaritalStatus(rawPatient.maritalStatus),
            gender: formatGender(rawPatient.gender),
            employmentStatus: formatEmploymentStatus(rawPatient.employmentStatus),
        },
        address: {
            street: rawPatient.address || "Not provided",
            street2: rawPatient.addressLineTwo || null,
            city: rawPatient.city || "Not provided",
            state: rawPatient.state || "Not provided",
            zipCode: rawPatient.zipCode || "Not provided",
            country: rawPatient.country || "Not provided",
            isValid: rawPatient.addressValid || false,
        },
        guardian: {
            name: rawPatient.guardianName || null,
            phoneNumber: rawPatient.guardianPhoneNumber || null,
        },
        healthInfo: {
            allergies: rawPatient.allergies || [],
            familyHistory: rawPatient.familyHistory || [],
            medicalHistory: rawPatient.medicalHistory || [],
            prescriptions: rawPatient.prescriptions || [],
            goalWeight: rawPatient.goalWeight || 0,
        },
        systemInfo: {
            isOnboardingComplete: rawPatient.isOnboardingComplete || false,
            createdDate: rawPatient.createdDate ? formatDate(rawPatient.createdDate) : "Not provided",
            firebaseUid: rawPatient.firebaseUid || "",
        },
    }
} 
