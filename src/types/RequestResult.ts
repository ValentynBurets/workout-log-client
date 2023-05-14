export interface RequestType {
  type: boolean;
  message: string;
}

export interface RequestResult {
  good: {
    message: string;
    show: boolean;
  };
  bad: {
    message: string;
    show: boolean;
  };
}
