export interface Patient {
    id: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
    email?: string
    address?: string
    addressLineTwo?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    addressValid?: boolean
    guardianName?: string
    guardianPhoneNumber?: string
    maritalStatus?: string
    gender?: string
    employmentStatus?: string
    dateOfBirth?: string
    allergies?: string[]
    familyHistory?: string[]
    medicalHistory?: string[]
    prescriptions?: string[]
    goalWeight?: number
    isOnboardingComplete?: boolean
    createdDate?: string
    firebaseUid?: string
    measurements?: Measurement[]
    medications?: Medication[]
}

export interface Measurement {
    id: string
    patientId: string
    type: string
    value: number | string
    unit: string
    date: string
}

export interface Medication {
    id: string
    patientId: string
    name: string
    dosage: string
    frequency: string
    startDate: string
    endDate?: string
    active: boolean
}

export interface Alert {
    id: string
    type?: string
    data?: any
    createdDate?: string
    actionRequired?: boolean
    resolvedDate?: string
    tags?: { id: string; name: string }[]
    assignedProvider?: Provider
    resolvingProvider?: Provider
    occurances?: number
    patient?: {
        id: string
        firstName?: string
        lastName?: string
        email?: string
        phoneNumber?: string
    }
}

export interface Provider {
    id: string
    firstName: string
    lastName: string
    email: string
}

export interface Charge {
    id: string
    total?: number
    totalOutstanding?: number
    description?: string
    status?: string
    patient?: {
        id: string
        firstName?: string
        lastName?: string
        phoneNumber?: string
        email?: string
        address?: string
        city?: string
        state?: string
        zipCode?: string
    }
    createdDate?: string
    creator?: Provider
    adjustments?: any[]
    payments?: any[]
    plannedPayments?: any[]
    comment?: string
    items?: any[]
    locationId?: string
    locationName?: string
}

export interface DoctorsNote {
    id: string
    eventId?: string
    parentNoteId?: string
    noteTranscriptId?: string
    duration?: number
    version?: number
    currentVersion?: number
    content?: string
    summary?: string
    aiGenerated?: boolean
    template?: string
    patient?: {
        id: string
        firstName?: string
        lastName?: string
        phoneNumber?: string
        email?: string
        address?: string
        addressLineTwo?: string
        city?: string
        state?: string
        zipCode?: string
        country?: string
        dateOfBirth?: string
        gender?: string
    }
    createdDate?: string
    providerNames?: string[]
}

export interface Event {
    id: string
    title?: string
    organizer?: Provider
    start?: string
    end?: string
    type?: string
    status?: string
    meetingLink?: string
    attendees?: {
        user: {
            id: string
            firstName?: string
            lastName?: string
            email?: string
        }
        inviteStatus?: string
    }[]
    location?: {
        id: string
        name?: string
        address?: string
        city?: string
        state?: string
        zipCode?: string
        country?: string
        isVirtual?: boolean
        meetingLink?: string
    }
    formCompleted?: boolean
    appointment?: {
        id: string
        eventId?: string
        patientId?: string
        providerId?: string
        reason?: string
        confirmationStatus?: string
        confirmationDate?: string
        checkedInDate?: string
        appointmentType?: string
    }
}

export interface Memo {
    id: string
    patient?: {
        id: string
        firstName?: string
        lastName?: string
        email?: string
        phoneNumber?: string
    }
    note?: string
    creator?: Provider
    createdDate?: string
    updatedDate?: string
    type?: string
    priority?: string
    status?: string
    dueDate?: string
    completedDate?: string
}

export interface PaymentMethod {
    id: string
    patientId: string
    brand?: string
    last4?: string
    expMonth?: number
    expYear?: number
    accountHolderType?: string
    accountNumberLast4?: number
    bankName?: string
    routingNumber?: number
    description?: string
    type?: string
    isDefault?: boolean
    cardholderName?: string
    billingAddress?: {
        address?: string
        city?: string
        state?: string
        zipCode?: string
        country?: string
    }
} 
