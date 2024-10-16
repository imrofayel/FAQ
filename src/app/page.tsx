// "use client"

// import React, { useState } from "react"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { ChevronDown } from "lucide-react"
// import faqData from "../data/faq-data.json"

// type FAQItem = {
//   question: string
//   answer: string
// }

// type FAQData = {
//   title: string
//   description: string
//   tabs: string[]
//   faqs: {
//     [key: string]: FAQItem[]
//   }
// }

// const typedFaqData = faqData as FAQData

// export default function StyledFAQComponent() {
//   const [activeCategory, setActiveCategory] = useState(typedFaqData.tabs[0])

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-white">
//       <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">{typedFaqData.title}</h1>
//       <p className="text-center text-gray-600 mb-8">{typedFaqData.description}</p>
//       <Tabs defaultValue={typedFaqData.tabs[0]} onValueChange={setActiveCategory}>
//         <TabsList className="flex justify-center space-x-2 mb-8">
//           {typedFaqData.tabs.map((tab) => (
//             <TabsTrigger
//               key={tab}
//               value={tab}
//               className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out"
//             >
//               {tab}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//         {typedFaqData.tabs.map((tab) => (
//           <TabsContent key={tab} value={tab}>
//             <Accordion type="single" collapsible className="w-full space-y-4">
//               {typedFaqData.faqs[tab]?.map((faq, index) => (
//                 <AccordionItem
//                   key={index}
//                   value={`item-${index}`}
//                   className="border border-gray-200 rounded-lg shadow-sm"
//                 >
//                   <AccordionTrigger className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out">
//                     <span className="text-base font-medium">{faq.question}</span>
//                     <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
//                   </AccordionTrigger>
//                   <AccordionContent className="px-6 py-4 text-gray-600">
//                     {faq.answer}
//                   </AccordionContent>
//                 </AccordionItem>
//               )) || (
//                 <p className="text-center text-gray-600">No FAQs available for this category.</p>
//               )}
//             </Accordion>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }


import StyledFAQComponent from '@/components/faq'

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <StyledFAQComponent />
    </div>
  )
}