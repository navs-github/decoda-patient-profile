import { getAlerts, getDoctorsNotes, getEvents, getMemos } from "@/lib/data"

export interface ConversationEntry {
    id: string
    type: "message" | "note" | "memo" | "event"
    title: string
    content: string
    date: string
    creator: {
        firstName: string
        lastName: string
    }
    eventId?: string
    eventTitle?: string
}

export interface EventGroup {
    event: {
        id: string
        title: string
        date: string
        type: string
    }
    conversations: ConversationEntry[]
}

export const getConversationEntries = (): ConversationEntry[] => {
    const alerts = getAlerts()
    const doctorsNotes = getDoctorsNotes()
    const events = getEvents()
    const memos = getMemos()

    const patientMessages = alerts
        .filter(alert => alert.type === "MESSAGE_RECEIVED")
        .map(alert => ({
            id: alert.id,
            type: "message" as const,
            title: "Message from Patient",
            content:
                typeof alert.data?.message === 'string'
                    ? alert.data.message
                    : (alert.data?.message ? String(alert.data.message) : ""),
            date: alert.createdDate ?? "",
            creator: {
                firstName:
                    alert.data?.patient && typeof alert.data.patient === 'object' && 'firstName' in alert.data.patient
                        ? (alert.data.patient.firstName as string)
                        : "",
                lastName:
                    alert.data?.patient && typeof alert.data.patient === 'object' && 'lastName' in alert.data.patient
                        ? (alert.data.patient.lastName as string)
                        : ""
            }
        }))

    const clinicalNotes = doctorsNotes.map(note => ({
        id: note.id,
        type: "note" as const,
        title: note.aiGenerated ? "AI-Generated Note" : "Doctor's Note",
        content: note.content ?? "",
        date: note.createdDate ?? "",
        creator: {
            firstName:
                note.providerNames && note.providerNames.length > 0 && note.providerNames[0].split(" ")[1]
                    ? note.providerNames[0].split(" ")[1]
                    : "",
            lastName:
                note.providerNames && note.providerNames.length > 0 && note.providerNames[0].split(" ")[2]
                    ? note.providerNames[0].split(" ")[2]
                    : ""
        },
        eventId: note.eventId,
        eventTitle: events.find(e => e.id === note.eventId)?.title
    }))

    const staffMemos = memos.map(memo => ({
        id: memo.id,
        type: "memo" as const,
        title: "Memo",
        content: memo.note ?? "",
        date: memo.createdDate ?? "",
        creator: memo.creator
            ? { firstName: memo.creator.firstName, lastName: memo.creator.lastName }
            : { firstName: "", lastName: "" },
    }))

    return [...patientMessages, ...clinicalNotes, ...staffMemos]
}

export const getEventGroups = (): EventGroup[] => {
    const events = getEvents()
    const conversationEntries = getConversationEntries()

    const eventGroups = events.map(event => ({
        event: {
            id: event.id,
            title: event.title ?? "",
            date: event.start ?? "",
            type: event.type ?? ""
        },
        conversations: conversationEntries
            .filter(entry => entry.eventId === event.id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }))

    const standaloneConversations = conversationEntries
        .filter(entry => !entry.eventId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (standaloneConversations.length > 0) {
        eventGroups.push({
            event: {
                id: "general",
                title: "General Communications",
                date: standaloneConversations[0].date,
                type: "GENERAL"
            },
            conversations: standaloneConversations
        })
    }

    return eventGroups
        .filter(group => group.conversations.length > 0)
        .sort((a, b) => {
            const aDate = new Date(a.conversations[0].date)
            const bDate = new Date(b.conversations[0].date)
            return bDate.getTime() - aDate.getTime()
        })
} 
