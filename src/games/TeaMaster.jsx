import { useState } from 'react';

const TEA_QUESTIONS = [
  {
    question: "You're brewing delicate Silver Needle White Tea. What is the optimal water temperature to prevent scorching the tender buds and releasing bitter tannins?",
    options: [
      "75°C - 80°C (Steaming, pre-boil)", 
      "85°C with a gentle ceramic pour", 
      "78°C cooled for 2 minutes", 
      "70°C for extra sweet floral notes"
    ],
    fact: "White tea consists of un-opened leaf shoots covered in fine silvery hairs. Gentle temperatures protect its floral delicacy!"
  },
  {
    question: "Pu-erh tea is famous for undergoing microbial fermentation over years. What is the traditional classification for artificially accelerated wet-piling fermentation?",
    options: [
      "Shou Pu-erh (Ripe)", 
      "Wo Dui Fermentation Method", 
      "Post-Fermented Dark Tea", 
      "Accelerated Cellar Ageing"
    ],
    fact: "Invented in 1973, Wo Dui (wet-piling) accelerates aging using controlled moisture and heat!"
  },
  {
    question: "In traditional Gongfu Cha brewing, what is the primary purpose of the 'Washing the Leaves' (Rinsing) steep?",
    options: [
      "To wake up tightly rolled leaves & release trapped aromatics", 
      "To thermally shock the tea leaves for extraction", 
      "To rinse tiny leaf dust particles off", 
      "To warm up your gaiwan teapot vessel"
    ],
    fact: "The first flash-rinse thermally shocks tightly balled oolongs or aged puerhs, opening the leaves for maximum flavor!"
  },
  {
    question: "True tea exclusively comes from which plant species?",
    options: [
      "Camellia sinensis var. sinensis", 
      "Camellia sinensis var. assamica", 
      "Camellia sinensis (The Tea Plant)", 
      "Camellia sinensis species"
    ],
    fact: "Every single true tea—white, green, oolong, black, and dark tea—comes from Camellia sinensis! Herbal infusions are technically 'tisanes'."
  }
];

export default function TeaMasterGame({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFact, setShowFact] = useState(false);

  const q = TEA_QUESTIONS[currentStep];

  const handleSelect = (idx) => {
    setSelectedOption(idx);
    setShowFact(true);
  };

  const handleNext = () => {
    if (currentStep + 1 < TEA_QUESTIONS.length) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
      setShowFact(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center bg-cream-100 p-6 rounded-3xl shadow-lg border-2 border-blush-300 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-mocha-900 mb-1">🍵 Level 3: The Tea Oracle</h2>
      <p className="text-sm text-mocha-800 mb-4">Prove your elite Connoisseur tea wisdom (Question {currentStep + 1}/4)</p>

      {/* Question Box */}
      <div className="bg-white p-4 rounded-2xl border border-blush-300 w-full mb-4 shadow-sm">
        <p className="font-semibold text-mocha-900 text-sm md:text-base mb-3">{q.question}</p>
        
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            let btnStyle = "bg-cream-50 text-mocha-900 hover:bg-blush-100 border-cream-200";
            if (selectedOption !== null && idx === selectedOption) {
              btnStyle = "bg-green-200 text-mocha-900 border-green-400 font-bold scale-[1.02]";
            }
            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3 rounded-xl text-xs md:text-sm border transition-all cursor-pointer ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {showFact && (
        <div className="w-full p-3 rounded-xl mb-4 text-xs bg-green-100 text-green-900 border border-green-300 animate-bounce-short">
          <p className="font-extrabold text-sm mb-1 text-blush-500">all are true jsjs 🤪✨</p>
          <p><span className="font-bold">Tea Master Fact:</span> {q.fact}</p>
        </div>
      )}

      {showFact && (
        <button
          onClick={handleNext}
          className="w-full py-2.5 bg-blush-500 text-white rounded-full font-bold shadow-md hover:bg-blush-300 hover:text-mocha-900 transition-all cursor-pointer"
        >
          {currentStep + 1 === TEA_QUESTIONS.length ? 'Unlock Final Reward 🎉' : 'Next Tea Trial ➔'}
        </button>
      )}
    </div>
  );
}