import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../../../utils/defineTheme";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import { languageData } from "../../../constants/languageData";
import monacoThemes from "monaco-themes/themes/themelist";
import Editor from "@monaco-editor/react";
import { Link } from "react-router-dom";

const CodingIDE = () => {
  const rejectedThemes = [
    "cobalt2",
    "dracula",
    "githubdark",
    "githublight",
    "idle",
    "slushandpoppies",
    "nord",
    "monokaibright",
    "merbivoresoft",
    "lazy",
    "katzenmilch",
    "kuroirtheme",
  ];
  const [code, setCode] = useState("console.log('Welcome to Algocraft!');");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({});
  const [language, setLanguage] = useState(languageData["javascript"]);
  const filteredThemes = Object.entries(monacoThemes)
    .filter(([value]) => !rejectedThemes.includes(value))
    .reduce((obj, [value, label]) => {
      obj[value] = label;
      return obj;
    }, {});

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleEditorChange = (value) => {
    setCode(value);
    onChange("code", value);
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    try {
      if (["light", "vs-dark"].includes(theme.value)) {
        setTheme(theme);
      } else {
        defineTheme(theme.value).then((_) => setTheme(theme));
      }
    } catch {
      console.error("Error changing theme!");
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function handleLanguageChange(option) {
    setLanguage(languageData[option.value]);
    setCode(option.boilerplate);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="daddy d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex justify-content-center align-items-center">
          <div className="bahar px-4 py-2">
            <div className="dropdown">
              <button
                className="options dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span
                  className="mx-2"
                  dangerouslySetInnerHTML={{ __html: language.icon }}
                ></span>
                <span>{language.name}</span>
              </button>
              <ul className="dropdown-menu">
                {Object.values(languageData).map((option) => (
                  <li key={option.value}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleLanguageChange(option)}
                    >
                      <span
                        className="mx-2"
                        dangerouslySetInnerHTML={{ __html: option.icon }}
                      ></span>
                      <span>{option.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bahar px-4 py-2">
            <div className="dropdown">
              <button
                className="options dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {theme.label}
              </button>
              <ul
                className="dropdown-menu"
                style={{
                  height: "auto",
                  maxHeight: "300px",
                  overflowX: "hidden",
                }}
              >
                {Object.entries(filteredThemes).map(([value, label]) => (
                  <li key={value}>
                    <Link
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleThemeChange({ value, label })}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          {processing ? (
            <button
              className="options"
              disabled
              style={{ cursor: "not-allowed" }}
            >
              <i className="m-1 fa-solid fa-gears"></i>
              Processing
            </button>
          ) : (
            <button
              className="options"
              disabled={!code}
              onClick={handleCompile}
            >
              <i className="m-1 fa-solid fa-gears"></i>
              Compile
            </button>
          )}
        </div>
      </div>
      <div className="d-flex px-4 py-4 w-100">
        <div className="editor d-flex flex-column w-70 h-100 justify-content-start align-items-end">
          <div
            className="overflow-hidden w-100 h-100"
            style={{
              border: "none",
              borderRadius: "8px",
              boxShadow:
                " 0px 2px 4px #00000014,0px 4px 8px #00000014,0px 6px 12px #00000014",
            }}
          >
            <Editor
              height="82vh"
              width="100%"
              language={language.value || "javascript"}
              value={code}
              theme={theme.value}
              onChange={handleEditorChange}
            />
          </div>
        </div>

        <div className="right-container  d-flex flex-shrink-0  flex-column">
          <OutputWindow outputDetails={outputDetails} />
          <div className="d-flex flex-column mt-3  w-100">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};
export default CodingIDE;
