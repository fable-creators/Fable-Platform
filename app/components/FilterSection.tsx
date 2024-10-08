"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterSectionProps {
  onSearch: (query: string) => void;
  onFilterChange: (filterType: string, value: string, checked: boolean) => void;
}

export function FilterSection({ onSearch, onFilterChange }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const platforms = ['Web', 'Windows', 'iOS', 'Android'];
  const genres = ['Action', 'Adventure', 'Puzzle', 'Strategy', 'RPG'];
  const chains = ['BeraChain', 'Arbitrum', 'ETH', 'Solana'];

  return (
    <div className="w-full md:w-64 space-y-4 bg-sky dark:bg-plum p-4 rounded-lg shadow-md">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center bg-coffee hover:bg-grape text-sky dark:bg-sand dark:hover:bg-sky dark:text-plum"
      >
        <span>Filters</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      {isExpanded && (
        <>
          <Input
            type="search"
            placeholder="Search games..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-sand text-coffee placeholder-coffee/70 dark:bg-midnight dark:text-sky dark:placeholder-sky/70"
          />
          <Accordion type="multiple" className="w-full">
            {['platform', 'genre', 'chain'].map((section) => (
              <AccordionItem key={section} value={section} className="border-b border-coffee dark:border-sand">
                <AccordionTrigger className="text-coffee hover:text-grape dark:text-sky dark:hover:text-sand">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  {(section === 'platform' ? platforms : section === 'genre' ? genres : chains).map((item) => (
                    <div key={item} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={`${section}-${item}`}
                        onCheckedChange={(checked) =>
                          onFilterChange(section, item, checked as boolean)
                        }
                        className="border-coffee dark:border-sand text-grape dark:text-sand"
                      />
                      <label
                        htmlFor={`${section}-${item}`}
                        className="text-sm font-medium leading-none text-coffee dark:text-sky peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
}
