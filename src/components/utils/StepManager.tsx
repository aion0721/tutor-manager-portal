import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

interface StepData {
  id: string;
  step1: string;
  step2: string;
}

const StepRow: React.FC<{
  label: string;
  date: string;
  onUpdate: () => void;
}> = ({ label, date, onUpdate }) => {
  const status = date ? "作業終了" : "作業未済";
  const buttonLabel = date ? "更新" : "開始";

  return (
    <Card className="mb-3">
      <div className="flex justify-content-between align-items-center">
        <div>
          <h3>{label}</h3>
          <p>状態: {status}</p>
          {date && <p>完了日時: {date}</p>}
        </div>
        <Button label={buttonLabel} onClick={onUpdate} />
      </div>
    </Card>
  );
};

const StepManager: React.FC = () => {
  const [stepData, setStepData] = useState<StepData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // APIからデータを取得する（実際のエンドポイントに置き換えてください）
      const response = {
        id: "pit00000",
        step1: "2024/11/11 12:00:00",
        step2: "",
      };
      setStepData(response);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };

  const updateStep = async (step: "step1" | "step2") => {
    if (stepData) {
      const newData = {
        ...stepData,
        [step]: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      try {
        // APIを呼び出してデータを更新する（実際のエンドポイントに置き換えてください）
        //await axios.put('https://api.example.com/steps', newData);
        setStepData(newData);
      } catch (error) {
        console.error("データの更新に失敗しました:", error);
      }
    }
  };

  if (!stepData) {
    return <ProgressSpinner />;
  }

  return (
    <div>
      <h2>ID: {stepData.id}</h2>
      <StepRow
        label="Step 1"
        date={stepData.step1}
        onUpdate={() => updateStep("step1")}
      />
      <StepRow
        label="Step 2"
        date={stepData.step2}
        onUpdate={() => updateStep("step2")}
      />
    </div>
  );
};

export default StepManager;
