
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ChatSection } from "@/components/ChatbotInterface";

interface QuestionnairePanelProps {
  section: ChatSection;
  onBack: () => void;
  onSubmit: (answers: Record<string, any>) => void;
}

const QuestionnairePanel: React.FC<QuestionnairePanelProps> = ({ section, onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Define questions based on the section
  const questions = getQuestionsForSection(section);
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / questions.length) * 100;
  
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(answers);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };
  
  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value
    });
  };
  
  // Current question data
  const currentQuestion = questions[currentStep];

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handlePrevious} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
          Back
        </Button>
        <h2 className="text-xl font-semibold flex-1 text-center">
          {getSectionTitle(section)}
        </h2>
      </div>
      
      <Progress value={progress} className="mb-8" />
      
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium mb-2">{currentQuestion.question}</h3>
          {currentQuestion.description && (
            <p className="text-muted-foreground">{currentQuestion.description}</p>
          )}
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          {renderQuestionInput(currentQuestion, answers[currentQuestion.id], handleAnswerChange)}
        </div>
        
        <div className="flex justify-end mt-8">
          <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
            {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get questions based on section
function getQuestionsForSection(section: ChatSection) {
  switch (section) {
    case "basic-questions":
      return [
        {
          id: "budget",
          question: "What is your budget range?",
          type: "slider",
          min: 100000,
          max: 1500000,
          step: 50000,
          defaultValue: 500000
        },
        {
          id: "location",
          question: "What location are you considering?",
          type: "select",
          options: [
            { value: "downtown", label: "Downtown" },
            { value: "suburbs", label: "Suburbs" },
            { value: "rural", label: "Rural Areas" }
          ]
        },
        {
          id: "features",
          question: "What features are important to you?",
          type: "checkbox",
          options: [
            { value: "garden", label: "Garden/Yard" },
            { value: "parking", label: "Parking" },
            { value: "smart", label: "Smart Home Features" },
            { value: "pool", label: "Swimming Pool" }
          ]
        },
        {
          id: "buildingAge",
          question: "Do you prefer new or older buildings?",
          type: "radio",
          options: [
            { value: "new", label: "New Construction (< 5 years)" },
            { value: "medium", label: "Medium Age (5-20 years)" },
            { value: "old", label: "Older Properties (> 20 years)" }
          ]
        }
      ];
    case "demographics":
      return [
        {
          id: "ageGroups",
          question: "Which age demographics are important to you?",
          type: "checkbox",
          options: [
            { value: "young", label: "Young Adults (20-35)" },
            { value: "families", label: "Families (35-50)" },
            { value: "seniors", label: "Seniors (50+)" }
          ]
        },
        {
          id: "householdType",
          question: "What household types do you want to live around?",
          type: "radio",
          options: [
            { value: "singles", label: "Singles" },
            { value: "couples", label: "Couples without children" },
            { value: "families", label: "Families with children" },
            { value: "mixed", label: "Mixed demographics" }
          ]
        },
        {
          id: "futureProjections",
          question: "How important are future demographic projections to you?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 3
        }
      ];
    case "construction":
      return [
        {
          id: "greenSpace",
          question: "How important is access to green spaces?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 3
        },
        {
          id: "amenities",
          question: "Which amenities do you want nearby?",
          type: "checkbox",
          options: [
            { value: "restaurants", label: "Restaurants" },
            { value: "malls", label: "Shopping Malls" },
            { value: "parks", label: "Parks" },
            { value: "schools", label: "Schools" },
            { value: "gyms", label: "Fitness Centers" }
          ]
        },
        {
          id: "development",
          question: "Are you comfortable with ongoing construction nearby?",
          type: "radio",
          options: [
            { value: "yes", label: "Yes, I want to be in a developing area" },
            { value: "limited", label: "Limited construction is fine" },
            { value: "no", label: "No, I prefer established areas" }
          ]
        }
      ];
    case "transportation":
      return [
        {
          id: "transportTypes",
          question: "Which transportation options do you need?",
          type: "checkbox",
          options: [
            { value: "subway", label: "Subway/Metro" },
            { value: "bus", label: "Bus Lines" },
            { value: "bike", label: "Bike Paths" },
            { value: "car", label: "Car-friendly Roads" },
            { value: "walk", label: "Walkable Areas" }
          ]
        },
        {
          id: "commuteTime",
          question: "What's your maximum acceptable commute time?",
          type: "slider",
          min: 10,
          max: 60,
          step: 5,
          defaultValue: 30
        },
        {
          id: "futureTransport",
          question: "How important are planned transportation improvements?",
          type: "radio",
          options: [
            { value: "very", label: "Very important" },
            { value: "somewhat", label: "Somewhat important" },
            { value: "not", label: "Not important" }
          ]
        }
      ];
    case "smart-home":
      return [
        {
          id: "smartFeatures",
          question: "Which smart home features interest you?",
          type: "checkbox",
          options: [
            { value: "thermostat", label: "Smart Thermostats" },
            { value: "security", label: "Security Systems" },
            { value: "lights", label: "Smart Lighting" },
            { value: "voice", label: "Voice Assistants" },
            { value: "appliances", label: "Smart Appliances" }
          ]
        },
        {
          id: "smartImportance",
          question: "How important is smart home technology to you?",
          type: "slider",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 3
        },
        {
          id: "futureProof",
          question: "Do you want a home that's ready for future tech?",
          type: "radio",
          options: [
            { value: "fully", label: "Fully future-proofed" },
            { value: "partial", label: "Partially ready" },
            { value: "basic", label: "Basic setup is fine" }
          ]
        }
      ];
    default:
      return [];
  }
}

// Helper function to render different input types
function renderQuestionInput(
  question: any, 
  value: any, 
  onChange: (value: any) => void
) {
  switch (question.type) {
    case "slider":
      const currentValue = value || question.defaultValue;
      return (
        <div className="space-y-4">
          <Slider
            min={question.min}
            max={question.max}
            step={question.step}
            value={[currentValue]}
            onValueChange={(vals) => onChange(vals[0])}
            className="mb-6"
          />
          <div className="flex justify-between text-sm">
            <span>{formatValue(question.min, question.id)}</span>
            <span className="font-medium">{formatValue(currentValue, question.id)}</span>
            <span>{formatValue(question.max, question.id)}</span>
          </div>
        </div>
      );
    
    case "select":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {question.options.map((option: any) => (
            <Button
              key={option.value}
              variant={value === option.value ? "default" : "outline"}
              className="h-16"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      );
    
    case "checkbox":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option: any) => {
            const isChecked = Array.isArray(value) && value.includes(option.value);
            return (
              <div key={option.value} className="flex items-start space-x-3 p-3 rounded-md border">
                <Checkbox 
                  id={`${question.id}-${option.value}`} 
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const newValue = Array.isArray(value) ? [...value] : [];
                    if (checked) {
                      onChange([...newValue, option.value]);
                    } else {
                      onChange(newValue.filter((v) => v !== option.value));
                    }
                  }}
                />
                <label 
                  htmlFor={`${question.id}-${option.value}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      );
    
    case "radio":
      return (
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-3"
        >
          {question.options.map((option: any) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 rounded-md border">
              <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
              <label 
                htmlFor={`${question.id}-${option.value}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      );
    
    default:
      return null;
  }
}

// Format values (e.g., budget as currency)
function formatValue(value: number, id: string) {
  if (id === "budget") {
    return `$${value.toLocaleString()}`;
  }
  if (id === "commuteTime") {
    return `${value} min`;
  }
  return value;
}

// Get section title
function getSectionTitle(section: ChatSection) {
  switch (section) {
    case "basic-questions":
      return "Basic Housing Questions";
    case "demographics":
      return "Demographics & Population";
    case "construction":
      return "Construction & Development";
    case "transportation":
      return "Transportation Options";
    case "smart-home":
      return "Smart Home Technology";
    default:
      return "";
  }
}

export default QuestionnairePanel;
