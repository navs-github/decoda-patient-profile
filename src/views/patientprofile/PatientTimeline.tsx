"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPatientTimeline, type TimelineEntry } from "@/services/patientTimelineService"
import { ClipboardList, ChevronDown } from "lucide-react"

export default function PatientTimeline() {
    const [timelineFilter, setTimelineFilter] = useState("All")
    const [expandedNote, setExpandedNote] = useState<string | null>(null)
    const [visibleEntries, setVisibleEntries] = useState(10)

    const timelineEntries = getPatientTimeline()
    const filteredEntries =
        timelineFilter === "All" ? timelineEntries : timelineEntries.filter((entry) => entry.category === timelineFilter)

    const toggleExpanded = (id: string) => {
        setExpandedNote(expandedNote === id ? null : id)
    }

    const handleAction = (entry: TimelineEntry) => {
        console.log(`Action clicked for ${entry.type} entry:`, entry)
    }

    const handleShowMore = () => {
        setVisibleEntries(prev => Math.min(prev * 2, filteredEntries.length))
    }

    const displayedEntries = filteredEntries.slice(0, visibleEntries)
    const hasMoreEntries = visibleEntries < filteredEntries.length

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div
                        className="mt-2 md:mt-0 w-[75vw] md:w-fit flex flex-row space-x-2 overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style>{`
                            .timelinefilter-scrollbar-hide::-webkit-scrollbar { display: none; }
                        `}</style>
                        {['All', 'Clinical Notes', 'Communications', 'Billing', 'Alerts'].map((filter) => (
                            <Button
                                key={filter}
                                variant={timelineFilter === filter ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setTimelineFilter(filter)}
                                className="whitespace-nowrap"
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-[720px] overflow-y-auto relative">
                    {displayedEntries.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <ClipboardList className="h-10 w-10 mb-4" />
                            <span className="text-2xl font-semibold">No activity yet</span>
                        </div>
                    ) : (
                        <>
                            {displayedEntries.map((entry) => {
                                const IconComponent = entry.icon
                                const isExpanded = expandedNote === entry.id
                                return (
                                    <div key={entry.id} className="relative">
                                        <div className="absolute left-5 sm:left-6 top-10 sm:top-12 bottom-0 w-px bg-gray-200 -z-10" />
                                        <div className="ml-0 relative bg-white sm:bg-white/90 p-1 sm:p-4 rounded-none sm:rounded-lg mt-1 mb-2 sm:mb-4 sm:shadow-sm sm:border sm:border-gray-200 border-b border-gray-200 last:border-b-0">
                                            <div className="sm:px-4 sm:py-4">
                                                <div className="flex flex-row items-start space-x-2 sm:space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center relative z-10">
                                                            <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex flex-col min-w-0">
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                            <h4 className="text-sm sm:text-base font-medium text-gray-900">{entry.title}</h4>
                                                            <span className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-0">{entry.date}</span>
                                                        </div>
                                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{entry.summary}</p>
                                                        {entry.fullContent && (
                                                            <>
                                                                {isExpanded && (
                                                                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gray-50 rounded-md">
                                                                        <p className="text-xs sm:text-sm text-gray-700">{entry.fullContent}</p>
                                                                    </div>
                                                                )}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => toggleExpanded(entry.id)}
                                                                    className="mt-2 h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mx-2 sm:-mx-3 self-start"
                                                                >
                                                                    {isExpanded ? "Show less" : "Show more"}
                                                                </Button>
                                                            </>
                                                        )}
                                                        {entry.actionLabel && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleAction(entry)}
                                                                className="mt-2 h-7 text-xs self-start"
                                                            >
                                                                {entry.actionLabel}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {hasMoreEntries && (
                                <div className="flex justify-center pt-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleShowMore}
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                        <ChevronDown className="h-4 w-4 mr-1" />
                                        Show More
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 
