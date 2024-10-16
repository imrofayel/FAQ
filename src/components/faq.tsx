"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

type FAQData = {
  title: string
  description: string
  tabs: string[]
  faqs: {
    [key: string]: FAQItem[]
  }
}

export default function StyledFAQComponent() {
    const [faqData, setFaqData] = useState<FAQData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState("")
  
    useEffect(() => {
      const fetchFAQData = async () => {
        try {
          const response = await fetch('/api/faq')
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data: FAQData = await response.json()
          setFaqData(data)
          setActiveCategory(data.tabs[0])
        } catch (err) {
          console.error('Error fetching FAQ data:', err)
          setError(`An error occurred while fetching FAQ data: ${err instanceof Error ? err.message : String(err)}`)
        } finally {
          setIsLoading(false)
        }
      }
  
      fetchFAQData()
    }, [])
  
    if (isLoading) {
      return <div className="text-center">Loading FAQ data...</div>
    }
  
    if (error) {
      return <div className="text-center text-red-500">{error}</div>
    }
  
    if (!faqData) {
      return <div className="text-center">No FAQ data available</div>
    }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">{faqData.title}</h1>
      <p className="text-center text-gray-600 mb-8">{faqData.description}</p>
      <Tabs defaultValue={faqData.tabs[0]} onValueChange={setActiveCategory}>
        <TabsList className="flex justify-center space-x-2 mb-8">
          {faqData.tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {faqData.tabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.faqs[tab]?.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg shadow-sm"
                >
                  <AccordionTrigger className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                    <span className="text-base font-medium">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )) || (
                <p className="text-center text-gray-600">No FAQs available for this category.</p>
              )}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}