import React, { useState, useEffect } from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

interface StepData {
  id: string;
  step1: string;
  step2: string;
}

const StepManager: React.FC = () => {
  const [stepData, setStepData] = useState<StepData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const customMarker = (item: any) => {
    return (
      <span
        className="custom-marker shadow-1"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };

  const fetchData = async () => {
    try {
      //const response = await axios.get<StepData>('https://api.example.com/steps');
      //setStepData(response.data);
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
        //await axios.put('https://api.example.com/steps', newData);
        setStepData(newData);
      } catch (error) {
        console.error("データの更新に失敗しました:", error);
      }
    }
  };

  const getStepStatus = (date: string) => {
    return date ? "作業終了" : "作業未済";
  };

  const timelineEvents = stepData
    ? [
        {
          status: "Step 1",
          date: stepData.step1,
          icon: stepData.step1 ? "pi pi-check" : "pi pi-circle",
          color: stepData.step1 ? "#4caf50" : "#f44336",
        },
        {
          status: "Step 2",
          date: stepData.step2,
          icon: stepData.step2 ? "pi pi-check" : "pi pi-circle",
          color: stepData.step2 ? "#4caf50" : "#f44336",
        },
      ]
    : [];

  const customContent = (item: any) => {
    return (
      <Card
        title={item.status}
        subTitle={getStepStatus(item.date)}
        className="mb-3"
      >
        <p>{item.date || "未実行"}</p>
        <Button
          label={item.date ? "更新" : "開始"}
          onClick={() =>
            updateStep(
              item.status.toLowerCase().replace(" ", "") as "step1" | "step2"
            )
          }
        />
      </Card>
    );
  };

  if (!stepData) {
    return <ProgressSpinner />;
  }

  return (
    <div>
      <h2>ID: {stepData.id}</h2>
      <Timeline
        value={timelineEvents}
        content={customContent}
        marker={customMarker}
        align="alternate"
        className="w-full"
      />
    </div>
  );
};

export default StepManager;
