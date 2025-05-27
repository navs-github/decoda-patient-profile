"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/data"
import {
    Calendar,
    MessageSquare,
    Stethoscope,
    FileText,
    ChevronDown,
    ChevronUp
} from "lucide-react"
import {
    ConversationEntry,
    getEventGroups
} from "@/services/patientConversationService"
import {
    getConversationActions,
    suggestAction
} from "@/services/patientActionService"

export default function PatientConversations() {
    const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())
    const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set())

    const eventGroups = getEventGroups()
    const actions = getConversationActions()

    const toggleEventExpanded = (eventId: string) => {
        const newExpanded = new Set(expandedEvents)
        if (newExpanded.has(eventId)) {
            newExpanded.delete(eventId)
        } else {
            newExpanded.add(eventId)
        }
        setExpandedEvents(newExpanded)
    }

    const toggleEntryExpanded = (entryId: string) => {
        const newExpanded = new Set(expandedEntries)
        if (newExpanded.has(entryId)) {
            newExpanded.delete(entryId)
        } else {
            newExpanded.add(entryId)
        }
        setExpandedEntries(newExpanded)
    }

    const getIcon = (type: ConversationEntry["type"]) => {
        switch (type) {
            case "message":
                return MessageSquare
            case "note":
                return Stethoscope
            case "memo":
                return FileText
            case "event":
                return Calendar
        }
    }

    const renderConversationEntry = (entry: ConversationEntry) => {
        const Icon = getIcon(entry.type)
        const isExpanded = expandedEntries.has(entry.id)
        const contentLines = entry.content.split('\n')
        const isLongContent = contentLines.length > 3
        const previewContent = isLongContent ? contentLines.slice(0, 3).join('\n') + '...' : entry.content

        const suggestedActionType = suggestAction(entry)
        const suggestedAction = actions[suggestedActionType]
        const ActionIcon = suggestedAction.icon

        return (
            <Card key={entry.id} className="overflow-hidden ml-8 mt-2">
                <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-gray-500" />
                            <CardTitle className="text-lg">{entry.title}</CardTitle>
                        </div>
                        {isLongContent && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleEntryExpanded(entry.id)}
                            >
                                {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </Button>
                        )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                        {formatDate(entry.date)} • {entry.creator.firstName} {entry.creator.lastName}
                    </div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {isExpanded ? entry.content : previewContent}
                    </div>
                    {isLongContent && !isExpanded && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 px-0 text-blue-600 hover:text-blue-700"
                            onClick={() => toggleEntryExpanded(entry.id)}
                        >
                            Show more
                        </Button>
                    )}
                    {suggestedActionType !== "none" && (
                        <div className="mt-4 pt-4 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                className={`${suggestedAction.color} flex items-center space-x-2`}
                                onClick={() => suggestedAction.handler(entry)}
                            >
                                <ActionIcon className="h-4 w-4" />
                                <span>{suggestedAction.label}</span>
                            </Button>
                        </div>
                    )}
                </CardHeader>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {eventGroups.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <MessageSquare className="h-10 w-10 mb-4" />
                    <span className="text-2xl font-semibold">No conversations yet</span>
                </div>
            ) : (
                eventGroups.map((group) => {
                    const isEventExpanded = expandedEvents.has(group.event.id)
                    const visibleConversations = isEventExpanded
                        ? group.conversations
                        : group.conversations.slice(0, 2)

                    return (
                        <div key={group.event.id}>
                            <Card className="overflow-hidden">
                                <CardHeader className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                            <CardTitle className="text-lg">{group.event.title}</CardTitle>
                                        </div>
                                        {group.conversations.length > 2 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleEventExpanded(group.event.id)}
                                            >
                                                {isEventExpanded ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {formatDate(group.event.date)}
                                    </div>
                                </CardHeader>
                            </Card>
                            {visibleConversations.map(renderConversationEntry)}
                            {!isEventExpanded && group.conversations.length > 2 && (
                                <Button
                                    variant="ghost"
                                    className="ml-8 mt-2"
                                    onClick={() => toggleEventExpanded(group.event.id)}
                                >
                                    Show {group.conversations.length - 2} more conversations
                                </Button>
                            )}
                        </div>
                    )
                })
            )}
        </div>
    )
} 
