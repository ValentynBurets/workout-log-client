import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface TrainingPlanFormProps {
  onCreate: (name: string, startDate: Date, endDate: Date) => void;
}

const TrainingPlanForm: React.FC<TrainingPlanFormProps> = ({ onCreate }) => {
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleCreate = () => {
    onCreate(name, startDate, endDate);
  };

  return (
    <div className="training-plan-form">
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="startDateTime">
          <Form.Label>Start Date and Time:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={startDate.toISOString().slice(0, -8)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="endDateTime">
          <Form.Label>End Date and Time:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={endDate.toISOString().slice(0, -8)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={handleCreate}>
        Create Training Plan
      </Button>
    </div>
  );
};

export default TrainingPlanForm;