"use client"

import { TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react"
import { TabSwitch } from "@/components/ui/TabSwitch"
import PatientProfileOverview from "@/views/patientprofile/PatientProfileOverview"
import PatientTimeline from "@/views/patientprofile/PatientTimeline"
import PatientConversations from "@/views/patientprofile/PatientConversations"
import PatientInfoCard from "@/components/patient/PatientInfoCard"
import { getPatient } from "@/services/patientProfileService"

export default function PatientPage() {
    const patient = getPatient()

    return (
        <div className="p-4">
            <div className="mx-auto max-w-7xl space-y-6">
                <PatientInfoCard patient={patient} />
                <TabGroup>
                    <TabList
                        className="flex space-x-6 bg-transparent p-0 mb-6 max-w-full overflow-x-auto whitespace-nowrap sm:max-w-[calc(100vw-2rem)] sm:px-0 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style>{`
                            .tablist-scrollbar-hide::-webkit-scrollbar { display: none; }
                        `}</style>
                        <TabSwitch label="Overview" />
                        <TabSwitch label="Timeline" />
                        <TabSwitch label="Conversations" />
                        <TabSwitch label="Schedule" badge="Coming soon" />
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <PatientProfileOverview />
                        </TabPanel>
                        <TabPanel>
                            <PatientTimeline />
                        </TabPanel>
                        <TabPanel>
                            <PatientConversations />
                        </TabPanel>
                        <TabPanel>
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <span className="text-2xl font-semibold mb-2">Schedule</span>
                                <span className="text-lg">Coming soon</span>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
} 
