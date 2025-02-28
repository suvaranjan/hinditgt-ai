"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import MCQReader from "@/components/mycomps/mcq-reader";
import SummaryReader from "@/components/mycomps/summery-reader";
import { toast } from "sonner";

export default function ReadingForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [readingStyle, setReadingStyle] = useState("");
  const [readingMode, setReadingMode] = useState("form"); // form, mcq, summary

  const handleRead = () => {
    // Validate form
    if (!subject || !topic || !readingStyle) {
      toast.error("Please fill all fields before proceeding");
      return;
    }

    // Set reading mode based on selection
    setReadingMode(readingStyle);
  };

  const handleBackToForm = () => {
    setReadingMode("form");
  };

  const getTopicOptions = () => {
    switch (subject) {
      case "nibandh":
        return [
          { value: "बनाम लार्ड कर्ज़न", label: "बनाम लार्ड कर्ज़न" },
          { value: "क्रोध", label: "क्रोध" },
          { value: "अशोक के फूल", label: "अशोक के फूल" },
          { value: "भोला राम का जीव", label: "भोला राम का जीव" },
        ];
      case "upanyas":
        return [
          { value: "कर्मभूमि", label: "कर्मभूमि" },
          { value: "चित्रलेखा", label: "चित्रलेखा" },
          { value: "आपका बंटी", label: "आपका बंटी" },
        ];
      case "kahani":
        return [
          { value: "कफ़न", label: "कफ़न" },
          { value: "पूस की रात", label: "पूस की रात" },
          { value: "पुरस्कार", label: "पुरस्कार" },
          { value: "आकाशदीप", label: "आकाशदीप" },
        ];
      default:
        return [];
    }
  };

  const getSubjectLabel = (value: string) => {
    switch (value) {
      case "nibandh":
        return "निबंध";
      case "upanyas":
        return "उपन्यास";
      case "kahani":
        return "कहानी";
      default:
        return value;
    }
  };

  // Render different content based on reading mode
  if (readingMode === "mcq") {
    return (
      <MCQReader
        subject={getSubjectLabel(subject)}
        topic={topic}
        onBack={handleBackToForm}
      />
    );
  }

  if (readingMode === "summary") {
    return (
      <SummaryReader
        subject={getSubjectLabel(subject)}
        topic={topic}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Reading Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="subject">Choose your subject</Label>
            <Select
              value={subject}
              onValueChange={(value) => {
                setSubject(value);
                setTopic(""); // Reset topic when subject changes
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="विषय चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nibandh">निबंध</SelectItem>
                <SelectItem value="upanyas">उपन्यास</SelectItem>
                <SelectItem value="kahani">कहानी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {subject && (
            <div className="space-y-3">
              <Label htmlFor="topic">Choose topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="विषय चुनें" />
                </SelectTrigger>
                <SelectContent>
                  {getTopicOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="reading-style">Choose reading style</Label>
            <Select value={readingStyle} onValueChange={setReadingStyle}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="पढ़ने की शैली चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">MCQ</SelectItem>
                <SelectItem value="summary">Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRead} className="w-full">
            Read
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
