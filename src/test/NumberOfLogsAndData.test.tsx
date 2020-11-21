import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React, { useContext } from "react";
import NumberOfLogsAndData from "../NumberOfLogsAndData";
import { RootStoreContext } from "../store/RootStore";

test("number of logs is rendered", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  render(<NumberOfLogsAndData />);

  const counter = screen.getByTestId("number-of-logs");
  expect(counter.textContent).toContain("0");

  context.current.logsStore.incrementNumberOfLogs();
  expect(counter.textContent).toContain("1");
});

test("logs data is rendered", () => {
  const { result: context } = renderHook(() => useContext(RootStoreContext));
  render(<NumberOfLogsAndData />);

  const logData = screen.getByTestId("log-data");
  const initialData = logData.textContent;
  expect(initialData).toContain("");

  context.current.logsStore.updateLogData();
  const updatedData = logData.textContent;
  expect(updatedData).not.toEqual(initialData);
});
