"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQData = {
  title: string;
  description: string;
  tabs: string[];
  faqs: {
    [key: string]: FAQItem[];
  };
};

export default function FAQ() {
  const [faqData, setFaqData] = useState<FAQData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch("/api/faq");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FAQData = await response.json();
        setFaqData(data);
        setActiveCategory(data.tabs[0]);
      } catch (err) {
        console.error("Error fetching FAQ data:", err);
        setError(
          `An error occurred while fetching FAQ data: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-300 text-2xl">Loading FAQ data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!faqData) {
    return <div className="text-center">No FAQ data available</div>;
  }

  return (
    <div className="md:w-[55%] flex flex-col items-center justify-center sm:p-6 blur-[0.10px] mb-8 w-full">
      <h1 className="helvetica text-[27px] sm:text-[44px] font-semibold text-center mb-2 text-gray-800 leading-relaxed sm:p-0 px-3">
        {faqData.title}
      </h1>
      <p className="md:w-[85%] w-full leading-relaxed sm:text-[18px] text-center text-gray-400 mb-5 sm:p-0 px-3">{faqData.description}</p>
      <Tabs defaultValue={faqData.tabs[0]} onValueChange={setActiveCategory} className="w-full flex flex-col items-center">
        <TabsList className="justify-center sm:scale-100 scale-[.96] sm:space-x-2 mb-4 bg-gray-50/80 border border-gray-100 py-4 items-center px-1 rounded-full inner">
          {faqData.tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="sm:px-6 rounded-full text-[15px] transition-colors duration-200 ease-in-out py-1 data-[state=active]:text-gray-800 text-gray-400 data-[state=active]:inner data-[state=active]:border data-[state=active]:border-gray-100 data-[state=active]:shadow-none data-[state=active]:transition-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {faqData.tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="w-full">
            <Accordion type="single" collapsible className="sm:p-0 p-1 w-full space-y-3 sm:space-y-4 scale-95 sm:scale-100">
              {faqData.faqs[tab]?.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-100 rounded-2xl inner"
                >
                  <AccordionTrigger className="flex justify-between items-center w-full px-4 sm:py-4 py-3 text-[18px] text-left text-gray-800 hover:no-underline">
                    <span className="text-[16.5px] text-gray-700">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4 pt-0 text-base text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              )) || (
                <p className="text-center text-gray-600">
                  No FAQs available for this category.
                </p>
              )}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
