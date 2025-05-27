import { LucideIcon, Stethoscope, CreditCard, FileText, AlertCircle } from "lucide-react"
import { getAlerts, getCharges, getDoctorsNotes, getMemos, formatDate } from "@/lib/data"

export interface TimelineEntry {
    id: string
    type: string
    icon: LucideIcon
    title: string
    date: string
    summary: string
    category: string
    fullContent?: string
    actionLabel?: string
}

const timelineTypeToActionLabel: Record<string, string | ((type: string) => string)> = {
    memo: "View Memo",
    alert: (type: string) => `View ${type} Alert`,
    doctorsNote: "View Note",
    charge: "View Charge",
    event: "View Event",
}

export const getPatientTimeline = (): TimelineEntry[] => {
    const memos = getMemos()
    const doctorsNotes = getDoctorsNotes()
    const charges = getCharges()
    const alerts = getAlerts()

    const timelineEntries: TimelineEntry[] = [
        ...memos.map((memo) => ({
            id: memo.id,
            type: "memo",
            icon: FileText,
            title: "Memo",
            summary: memo.note ?? "",
            date: memo.createdDate ?? "",
            category: "memo",
        })),
        ...doctorsNotes.map((note) => ({
            id: note.id,
            type: "note",
            icon: Stethoscope,
            title: note.aiGenerated
                ? "AI-Generated Note"
                : `Note from ${note.providerNames && note.providerNames.length > 0 ? note.providerNames[0] : "Provider"}`,
            date: formatDate(note.createdDate ?? ""),
            summary: note.summary ?? "",
            fullContent: note.content,
            category: "Clinical Notes",
        })),
        ...charges.map((charge) => ({
            id: charge.id,
            type: "billing",
            icon: CreditCard,
            title: "Charge Created",
            date: formatDate(charge.createdDate ?? ""),
            summary: `${charge.description || "No description"} - $${typeof charge.total === 'number' ? charge.total.toFixed(2) : "0.00"}. Status: ${charge.status || "Unknown"}`,
            category: "Billing",
            actionLabel: timelineTypeToActionLabel.billing as string,
        })),
        ...alerts.map((alert) => ({
            id: alert.id,
            type: "alert",
            icon: AlertCircle,
            title: alert.type ?? "Alert",
            summary: (
                typeof alert.data?.message === 'string' ? alert.data.message :
                    typeof alert.data?.title === 'string' ? alert.data.title :
                        typeof alert.data?.name === 'string' ? alert.data.name :
                            ""
            ),
            date: alert.createdDate ?? "",
            category: "alert",
        })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return timelineEntries
} 
