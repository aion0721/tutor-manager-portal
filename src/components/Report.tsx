import { Card } from "primereact/card";
import StepManager from "./utils/StepManager";

const Report: React.FC = () => {
  return (
    <Card title="Report">
      <p>Welcome Report</p>
      <StepManager />
    </Card>
  );
};

export default Report;
