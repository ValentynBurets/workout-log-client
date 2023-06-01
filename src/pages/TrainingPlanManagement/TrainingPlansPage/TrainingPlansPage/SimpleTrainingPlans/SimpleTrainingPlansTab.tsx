import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  DropdownButton,
  Dropdown,
  Spinner, 
  Form
} from "react-bootstrap";
import { Trans } from "react-i18next";
import style from "./SimpleTrainingPlansStyle.module.sass"
import { TrainingPlanList } from "../../../../../types/TrainingPlan/TrainingPlanList";
import GetTrainingPlans from "../Services/GetTrainingPlans";
import SimpleTrainingPlanDeck from "./Components/SimpleTrainingPlanDeck/SimpleTrainingPlanDeck";

interface ISimpleTrainingPlansTabProps {}

function SimpleTrainingPlansTab(props: ISimpleTrainingPlansTabProps) {
  
  const [dataLoading, setDataLoading] = useState({
    isLoading: true,
    requests: null,
    inProgress: null,
  });

  const SortTypes: string[] = ["Default", "ByNameAsc"];

  const[trainingPlans, setTrainingPlans] = useState<TrainingPlanList>(
    {
      scheduleTrainingPlans: [],
      simpleTrainingPlans: []
    }
  )

  //useEffect(()=> {console.log(trainingPlans.simpleTrainingPlans)}, [trainingPlans])

  const defaultSelectedParams = {
    sortType: "Default",
    name: "",
    trainingPlanType: "Simple"
  };

  const [selectedParams, setSelectedParam] = useState<{
    sortType: string;
    name: string;
    trainingPlanType: string;
  }>(defaultSelectedParams);

  const clearSortTypes = () => {
    setSelectedParam(defaultSelectedParams);
  };

  const setSortTypeHandler = (value: any) => {
    setSelectedParam((prev) => ({
      ...prev,
      sortType: value,
    }));
  };

  const handleNameChange = (event: any) => {
    setSelectedParam((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  useEffect(() => {
    GetTrainingPlans({
      selectedParams: selectedParams,
      setTrainingPlans: setTrainingPlans,
      setDataLoading: setDataLoading,
    });
  }, [selectedParams]);


  return (
    <div className={style.lotlist_page_background}>
      <Container>
        {dataLoading.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            <div className={style.present_col}>
              <div className={style.description}>
                <h1>
                  <Trans i18nKey="SimpleTrainingPlans">Simple training plans</Trans>
                </h1>
                <h5>
                  <Trans i18nKey="BestOffer">
                    Find your best offer for you with our service
                  </Trans>
                </h5>
              </div>
            </div>
            <Row className={style.lot_list_header_text}>
              <div>
                <Trans i18nKey="LotsList">List of scheduled plans</Trans>
              </div>
            </Row>

            <div className={style.top_row_options_style}>
              <div className={style.sort_col_style}>
                <label className={style.sort_label_style}>
                  <Trans i18nKey="SortType">sort type</Trans>
                </label>
                <DropdownButton
                  style={{ width: "100px" }}
                  className={style.drop_down_button}
                  title={selectedParams.sortType}
                  onSelect={setSortTypeHandler}
                >
                  {SortTypes.map((item, id) => (
                    <Dropdown.Item key={id} eventKey={item}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <div>
                <label className={style.sort_label_style}>
                  <Trans i18nKey="PLanName">Plan Name</Trans>
                </label>
                <Form.Control type="text" value={selectedParams.name} onChange={handleNameChange} />
              </div>
              <div>
                <Button
                  style={{
                    marginTop: "1.5rem",
                  }}
                  variant="primary"
                  onClick={clearSortTypes}
                >
                  <Trans i18nKey="Clear">clear</Trans>
                </Button>
              </div>
            </div>
            <Col>{trainingPlans && <SimpleTrainingPlanDeck SimpleTrainingPlan={trainingPlans.simpleTrainingPlans} />}</Col>
          </Container>
        )}
      </Container>
    </div>
  )
}

export default SimpleTrainingPlansTab