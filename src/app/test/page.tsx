"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/questions";
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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function TestPage() {
  const router = useRouter();
  const [subject, setSubject] = useState("All");
  const [questionCount, setQuestionCount] = useState(50);
  const [timer, setTimer] = useState(50);

  const handleStartTest = () => {
    // Navigate to quiz page with parameters
    router.push(
      `/quiz?subject=${subject}&questionCount=${questionCount}&timer=${timer}`
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Test Setting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="subject">Choose your subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="विषय चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="उपन्यास">उपन्यास</SelectItem>
                <SelectItem value="काव्य">काव्य</SelectItem>
                <SelectItem value="कहानी">कहानी</SelectItem>
                <SelectItem value="निबंध">निबंध</SelectItem>
                <SelectItem value="नाटक">नाटक</SelectItem>
                <SelectItem value="संस्मरण/रेखाचित्र">
                  संस्मरण/रेखाचित्र
                </SelectItem>
                <SelectItem value="पद्य (दोहे)">पद्य (दोहे)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="questions">Number of questions</Label>
              <span className="text-sm font-medium">{questionCount}</span>
            </div>
            <Slider
              id="questions"
              min={1}
              max={questions.length}
              step={1}
              value={[questionCount]}
              onValueChange={(value) => setQuestionCount(value[0])}
              className="py-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>{questions.length}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="timer">Timer (in Minutes)</Label>
              <span className="text-sm font-medium">{timer}</span>
            </div>
            <Slider
              id="timer"
              min={1}
              max={questions.length / 2}
              step={1}
              value={[timer]}
              onValueChange={(value) => setTimer(value[0])}
              className="py-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 min</span>
              <span>{questions.length / 2} min</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartTest} className="w-full">
            Start Test
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
