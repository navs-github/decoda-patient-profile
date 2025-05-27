import { LucideIcon, MessageSquare, Stethoscope, CreditCard, Bell, ClipboardList, Calendar, MessageCircle } from "lucide-react"
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

interface AlertData {
    name?: string
    title?: string
    start?: string
    message?: string
}

const alertTypeToIcon: Record<string, LucideIcon> = {
    FORM_SUBMITTED: ClipboardList,
    APPOINTMENT_SCHEDULED: Calendar,
    MESSAGE_RECEIVED: MessageCircle,
    DEFAULT: Bell,
}

const alertTypeToTitle: Record<string, string> = {
    FORM_SUBMITTED: "Form Submitted",
    APPOINTMENT_SCHEDULED: "Appointment Scheduled",
    MESSAGE_RECEIVED: "New Message",
}

const alertTypeToSummaryFormatter: Record<string, (data: AlertData) => string> = {
    FORM_SUBMITTED: (data) => `${data.name} submitted`,
    APPOINTMENT_SCHEDULED: (data) => data.title
        ? `${data.title} scheduled for ${data.start ? formatDate(data.start) : "Unknown date"}`
        : "Appointment scheduled",
    MESSAGE_RECEIVED: (data) => data.message ?? "No message",
    DEFAULT: () => "Action required",
}

const alertTypeToActionLabel: Record<string, string> = {
    MESSAGE_RECEIVED: "Reply",
    APPOINTMENT_SCHEDULED: "View Details",
    FORM_SUBMITTED: "Review Form",
}

const timelineTypeToActionLabel: Record<string, string | ((type: string) => string)> = {
    memo: "Reply",
    billing: "View Invoice",
    alert: (type: string) => alertTypeToActionLabel[type] || "View Details",
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
            icon: MessageSquare,
            title: `Memo from ${memo.creator?.firstName || "Unknown"} ${memo.creator?.lastName || ""}`.trim(),
            date: formatDate(memo.createdDate ?? ""),
            summary: memo.note ?? "",
            category: "Communications",
            actionLabel: timelineTypeToActionLabel.memo as string,
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
            icon: alertTypeToIcon[alert.type ?? "DEFAULT"] || Bell,
            title: alertTypeToTitle[alert.type ?? "DEFAULT"] || alert.type || "Alert",
            date: formatDate(alert.createdDate ?? ""),
            summary: (alertTypeToSummaryFormatter[alert.type ?? "DEFAULT"] || alertTypeToSummaryFormatter.DEFAULT)(alert.data ?? {}),
            category: "Alerts",
            actionLabel: typeof timelineTypeToActionLabel.alert === 'function'
                ? (timelineTypeToActionLabel.alert as (type: string) => string)(alert.type ?? "DEFAULT")
                : undefined,
        })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return timelineEntries
} 
