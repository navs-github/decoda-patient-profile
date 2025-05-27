import { LucideIcon, CalendarPlus, ClipboardList, Send, AlertCircle, CheckCircle2, Calendar, FileText } from "lucide-react"
import { ConversationEntry } from "./patientConversationService"
import { Alert } from "@/lib/types"

export type ActionType =
    | "schedule_followup"
    | "prescribe_medication"
    | "order_labs"
    | "send_message"
    | "mark_urgent"
    | "mark_resolved"
    | "schedule_appointment"
    | "request_records"
    | "review_form"
    | "view_appointment_details"
    | "reply_to_message"
    | "acknowledge_alert"
    | "none"

export interface Action {
    type: ActionType
    label: string
    icon: LucideIcon
    color: string
    handler: (entry: ConversationEntry | Alert) => void
}

// Extended suggestion function to handle both conversations and alerts
export const suggestAction = (entry: ConversationEntry | Alert): ActionType => {
    // Handle conversation entries
    if ('type' in entry && ['message', 'note', 'memo', 'event'].includes(entry.type)) {
        const content = entry.content.toLowerCase()

        if (entry.type === "message") {
            if (content.includes("follow up") || content.includes("follow-up")) {
                return "schedule_followup"
            }
            if (content.includes("urgent") || content.includes("emergency")) {
                return "mark_urgent"
            }
            if (content.includes("medication") || content.includes("prescription")) {
                return "prescribe_medication"
            }
            if (content.includes("lab") || content.includes("test")) {
                return "order_labs"
            }
            return "send_message"
        }

        if (entry.type === "note") {
            if (content.includes("follow up") || content.includes("follow-up")) {
                return "schedule_followup"
            }
            if (content.includes("medication") || content.includes("prescription")) {
                return "prescribe_medication"
            }
            if (content.includes("lab") || content.includes("test")) {
                return "order_labs"
            }
        }
    }

    // Handle alerts
    if ('type' in entry && typeof entry.type === 'string') {
        switch (entry.type) {
            case "FORM_SUBMITTED":
                return "review_form"
            case "APPOINTMENT_SCHEDULED":
                return "view_appointment_details"
            case "MESSAGE_RECEIVED":
                return "reply_to_message"
            default:
                return "acknowledge_alert"
        }
    }

    return "none"
}

export const getConversationActions = (): Record<ActionType, Action> => ({
    schedule_followup: {
        type: "schedule_followup",
        label: "Schedule Follow-up",
        icon: CalendarPlus,
        color: "text-blue-600",
        handler: (entry) => {
            console.log("Scheduling follow-up for:", entry.id)
        }
    },
    prescribe_medication: {
        type: "prescribe_medication",
        label: "Prescribe Medication",
        icon: ClipboardList,
        color: "text-green-600",
        handler: (entry) => {
            console.log("Prescribing medication for:", entry.id)
        }
    },
    order_labs: {
        type: "order_labs",
        label: "Order Labs",
        icon: ClipboardList,
        color: "text-purple-600",
        handler: (entry) => {
            console.log("Ordering labs for:", entry.id)
        }
    },
    send_message: {
        type: "send_message",
        label: "Send Message",
        icon: Send,
        color: "text-blue-600",
        handler: (entry) => {
            console.log("Sending message for:", entry.id)
        }
    },
    mark_urgent: {
        type: "mark_urgent",
        label: "Mark as Urgent",
        icon: AlertCircle,
        color: "text-red-600",
        handler: (entry) => {
            console.log("Marking as urgent:", entry.id)
        }
    },
    mark_resolved: {
        type: "mark_resolved",
        label: "Mark as Resolved",
        icon: CheckCircle2,
        color: "text-green-600",
        handler: (entry) => {
            console.log("Marking as resolved:", entry.id)
        }
    },
    schedule_appointment: {
        type: "schedule_appointment",
        label: "Schedule Appointment",
        icon: Calendar,
        color: "text-blue-600",
        handler: (entry) => {
            console.log("Scheduling appointment for:", entry.id)
        }
    },
    request_records: {
        type: "request_records",
        label: "Request Records",
        icon: FileText,
        color: "text-gray-600",
        handler: (entry) => {
            console.log("Requesting records for:", entry.id)
        }
    },
    review_form: {
        type: "review_form",
        label: "Review Form",
        icon: ClipboardList,
        color: "text-blue-600",
        handler: (entry) => {
            console.log("Reviewing form for:", entry.id)
        }
    },
    view_appointment_details: {
        type: "view_appointment_details",
        label: "View Appointment Details",
        icon: Calendar,
        color: "text-blue-600",
        handler: (entry) => {
            console.log("Viewing appointment details for:", entry.id)
        }
    },
    reply_to_message: {
        type: "reply_to_message",
        label: "Reply to Message",
        icon: Send,
        color: "text-blue-600",
        handler: (entry) => {
            console.log("Replying to message for:", entry.id)
        }
    },
    acknowledge_alert: {
        type: "acknowledge_alert",
        label: "Acknowledge Alert",
        icon: CheckCircle2,
        color: "text-green-600",
        handler: (entry) => {
            console.log("Acknowledging alert:", entry.id)
        }
    },
    none: {
        type: "none",
        label: "No Action Required",
        icon: CheckCircle2,
        color: "text-gray-400",
        handler: () => { }
    }
}) 
