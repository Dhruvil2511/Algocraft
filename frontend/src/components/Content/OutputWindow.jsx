import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <p className="px-2 py-1 text-danger">
          {atob(outputDetails?.compile_output)}
        </p>
      );
    } else if (statusId === 3) {
      return (
        <p className="px-2 py-1 text-success">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </p>
      );
    } else if (statusId === 5) {
      return (
        <p className="px-2 py-1 text-danger">
          {`Time Limit Exceeded`}
        </p>
      );
    } else {
      return (
        <p className="px-2 py-1 text-danger">
          {atob(outputDetails?.stderr)}
        </p>
      );
    }
  };
  return (
    <>
    <div className="mt-2 right-side  d-flex flex-column">
    </div>
      <div className="mt-2 output-box w-100 text-white ">
        {outputDetails ? <>{getOutput()}</> : "Output here.."}
      </div>
    </>
  );
};

export default OutputWindow;