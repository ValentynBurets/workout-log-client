import React, { useState, useEffect } from "react";
import "./ProfileForm.sass";

import { Container, Form, Button, InputGroup } from "react-bootstrap";

import { Trans } from "react-i18next";
import LoadProfileInfoService from "../Services/LoadProfileInfoService";
import { InfoData } from "../../../types/InfoData";

import axios from "axios";

import connection from "../../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import LoadProfileInfoByIdService from "../Services/LoadProfileInfoByIdService";

interface ProfileFormProps {
  isReadOnly?: boolean;
  id: string;
}

function ProfileForm(props: ProfileFormProps) {
  const [formState, setFormState] = useState({
    passwordVisible: false,
    confirmPassword: false,
    submitButtonActive: false,
    validated: false,
    serverMessage: "",
    requestCompleted: false,
  });

  const [confirmPasswordState, setConfirmPasswordState] = useState({
    password: "",
    passwordVisible: false,
  });

  const [fieldsStateCash, setFieldsStateCash] = useState<InfoData>({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [fieldsState, setFieldsState] = useState<InfoData>({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [fieldsModifiedState, setFieldsModifiedState] = useState({
    name: false,
    surname: false,
    phoneNumber: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    if (props.isReadOnly) {
      LoadProfileInfoByIdService({
        setFieldsState: setFieldsState,
        setFieldsStateCash: setFieldsStateCash,
        id: props.id,
      });
    } else {
      LoadProfileInfoService({
        setFieldsState: setFieldsState,
        setFieldsStateCash: setFieldsStateCash,
      });
    }
  }, []);

  useEffect(() => {
    setFieldsModifiedState(() => {
      return {
        name: fieldsState.name !== fieldsStateCash.name,
        surname: fieldsState.surname !== fieldsStateCash.surname,
        phoneNumber: fieldsState.phoneNumber !== fieldsStateCash.phoneNumber,
        email: fieldsState.email !== fieldsStateCash.email,
        password: Boolean(fieldsState.password),
      };
    });
  }, [fieldsState]);

  useEffect(() => {
    setFormState((prev) => {
      return {
        ...prev,
        submitButtonActive: Object.values(fieldsModifiedState).includes(true),
        confirmPassword:
          fieldsModifiedState.phoneNumber ||
          fieldsModifiedState.email ||
          fieldsModifiedState.password,
      };
    });
    // formState.submitButtonActive = !formState.submitButtonActive;
  }, [fieldsModifiedState]);

  const nameValidPattern = "[а-яА-ЯёЁіІїЇєЄa-zA-Z]{2,20}$";
  const surnameValidPattern = "[а-яА-ЯёЁіІїЇєЄa-zA-Z]{2,20}$";
  const phoneValidPattern = "^\\+380[0-9]{9}$";
  const passwordValidPattern =
    "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?~_+-=|]).{10,25}$";

  function checkDataChanges(update: {
    name?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
  }) {
    setFieldsState((prev) => {
      return {
        ...prev,
        ...update,
      };
    });
  }

  function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: { checkValidity: () => any };
  }) {
    event.preventDefault();

    setFormState((prev) => {
      return { ...prev, validated: true };
    });

    const isFormValid = event.currentTarget.checkValidity();

    if (isFormValid) {
      let requests = [];

      let currentData = fieldsState;

      if (fieldsModifiedState.name || fieldsModifiedState.surname) {
        requests.push(
          axios({
            url: connection.ServerUrl + connection.Routes.Profile.UpdateProfileInfo,
            method: "PUT",
            data: {
              name: currentData.name,
              surname: currentData.surname,
            },
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        );
      }

      if (fieldsModifiedState.phoneNumber) {
        requests.push(
          axios({
            url: connection.ServerUrl + connection.Routes.Profile.UpdateProfilePhone,
            method: "PUT",
            data: {
              newPhoneNumber: currentData.phoneNumber,
              currentPassword: confirmPasswordState.password,
            },
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        );
      }

      if (fieldsModifiedState.email) {
        requests.push(
          axios({
            url: connection.ServerUrl + connection.Routes.Profile.UpdateProfileEmail,
            method: "PUT",
            data: {
              newEmail: currentData.email,
              currentPassword: confirmPasswordState.password,
            },
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        );
      }

      if (fieldsModifiedState.password) {
        requests.push(
          axios({
            url: connection.ServerUrl + connection.Routes.Profile.UpdateProfilePassword,
            method: "PUT",
            data: {
              newPassword: currentData.password,
              currentPassword: confirmPasswordState.password,
            },
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        );
      }

      if (requests.length > 0) {
        Promise.all(requests)
          .then((responses) => {
            let statusCodeArray: number[] = [];

            responses.map((value) => statusCodeArray.push(value.status));

            if (statusCodeArray.every((value) => value === 200)) {
              setFieldsStateCash({
                name: currentData.name,
                surname: currentData.surname,
                phoneNumber: currentData.phoneNumber,
                email: currentData.email,
                password: "",
              });

              setFieldsState(() => {
                return {
                  ...currentData,
                  password: "",
                };
              });

              setFormState((prev) => {
                return {
                  ...prev,
                  serverMessage: "Success",
                  requestCompleted: true,
                };
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              setFormState((prev) => {
                return {
                  ...prev,
                  serverMessage: error.response.data,
                  requestCompleted: false,
                };
              });
            } else {
              setFormState((prev) => {
                return {
                  ...prev,
                  serverMessage: "Connection error",
                  requestCompleted: false,
                };
              });
            }
          });
      }
    }
  }

  useEffect(() => {
    console.log("fieldsState", fieldsState);
  });

  return (
    <Container className="profile-form-container">
      <Form
        className="m-0 profile-form"
        noValidate
        validated={formState.validated}
        onSubmit={handleSubmit}
      >
        <p className="fw-bolder fs-2">Profile</p>
        <div
          className={`message-container ${
            Boolean(formState.serverMessage) ? "visible" : "hidden"
          }  ${
            formState.requestCompleted ? "successResponse" : "errorResponse"
          }`}
        >
          {formState.serverMessage}
        </div>
        <Form.Group className="mb-3 mt-5">
          <Form.Label>
            <Trans i18nKey="Name">Name</Trans>
          </Form.Label>
          <InputGroup>
            <Form.Control
              value={fieldsState.name}
              onChange={(event) =>
                checkDataChanges({ name: event.target.value })
              }
              className="ig-form-control"
              type="text"
              pattern={nameValidPattern}
              maxLength={20}
              required
              disabled={props.isReadOnly}
            />
            <Form.Control.Feedback type="invalid">
              <Trans i18nKey="InvalidName">InvalidName</Trans>
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <Trans i18nKey="SurName">Surname</Trans>
          </Form.Label>
          <InputGroup>
            <Form.Control
              value={fieldsState.surname}
              onChange={(event) =>
                checkDataChanges({ surname: event.target.value })
              }
              className="ig-form-control"
              type="text"
              pattern={surnameValidPattern}
              maxLength={20}
              required
              disabled={props.isReadOnly}
            />
            <Form.Control.Feedback type="invalid">
              <Trans i18nKey="InvalidSurName">InvalidSurname</Trans>
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <Trans i18nKey="Phone">Phone number</Trans>
          </Form.Label>
          <InputGroup>
            <Form.Control
              value={fieldsState.phoneNumber}
              onChange={(event) =>
                checkDataChanges({ phoneNumber: event.target.value })
              }
              className="ig-form-control"
              type="text"
              maxLength={13}
              pattern={phoneValidPattern}
              required
              disabled={props.isReadOnly}
            />
            <Form.Control.Feedback type="invalid">
              <Trans i18nKey="InvalidPhone">invalid Phone number</Trans>
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <Trans i18nKey="Email">Email</Trans>
          </Form.Label>
          <InputGroup>
            <Form.Control
              value={fieldsState.email}
              onChange={(event) =>
                checkDataChanges({ email: event.target.value })
              }
              className="ig-form-control"
              type="email"
              maxLength={20}
              required
              disabled={props.isReadOnly}
            />
            <Form.Control.Feedback type="invalid">
              <Trans i18nKey="InvalidEmail">invalid Email</Trans>
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {!props.isReadOnly && (
          <Form.Group className="mb-3">
            <Form.Label>
              <Trans i18nKey="NewPassword">NewPassword</Trans>
            </Form.Label>
            <InputGroup>
              <Form.Control
                value={fieldsState.password}
                onChange={(event) =>
                  checkDataChanges({ password: event.target.value })
                }
                className="ig-form-control"
                type={formState.passwordVisible === true ? "text" : "password"}
                pattern={passwordValidPattern}
                maxLength={30}
                disabled={props.isReadOnly}
              />
              <i
                onClick={() =>
                  setFormState((prev) => {
                    return { ...prev, passwordVisible: !prev.passwordVisible };
                  })
                }
                className={
                  formState.passwordVisible
                    ? "bi bi-eye fs-4 eye-icon"
                    : "bi bi-eye-slash fs-4 eye-icon"
                }
                style={{ marginLeft: "10px" }}
              ></i>
              <Form.Control.Feedback type="invalid">
                <Trans i18nKey="InvalidNewPassword">invalid new password</Trans>
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        )}

        {formState.confirmPassword ? (
          <div>
            <Form.Group className="mb-1">
              <Form.Label>
                *<Trans i18nKey="CurrentPassword">Current password</Trans>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  value={confirmPasswordState.password}
                  onChange={(event) =>
                    setConfirmPasswordState((prev) => {
                      return { ...prev, password: event.target.value };
                    })
                  }
                  className="ig-form-control"
                  type={
                    confirmPasswordState.passwordVisible === true
                      ? "text"
                      : "password"
                  }
                  pattern={passwordValidPattern}
                  maxLength={30}
                  required
                  disabled={props.isReadOnly}
                />
                <i
                  onClick={() =>
                    setConfirmPasswordState((prev) => {
                      return {
                        ...prev,
                        passwordVisible: !prev.passwordVisible,
                      };
                    })
                  }
                  className={
                    confirmPasswordState.passwordVisible
                      ? "bi bi-eye fs-4 eye-icon"
                      : "bi bi-eye-slash fs-4 eye-icon"
                  }
                  style={{ marginLeft: "10px" }}
                ></i>
                <Form.Control.Feedback type="invalid">
                  <Trans i18nKey="InvalidCurrentPassword">
                    invalid current password
                  </Trans>
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
        ) : null}
        <Form.Group className="mt-4 text-center">
          {!props.isReadOnly && (
            <Button
              variant="primary"
              type="submit"
              className="submit-button"
              disabled={!formState.submitButtonActive || props.isReadOnly}
            >
              <Trans i18nKey="SubmitButtonText">Submit</Trans>
            </Button>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
}

export default ProfileForm;
