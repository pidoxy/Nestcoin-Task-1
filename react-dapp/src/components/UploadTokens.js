import { Upload, Button, Row, Col, Title } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import Header from "./Header";

const { Dragger } = Upload;

const UploadTokens = () => {
  const [fileName, setFileName] = useState("");
  const [state, setState] = useState({});

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    setFileName(fileObj.name);
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setState({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  return (
    <>

      <div className="ant-upload ant-upload-drag">
        <label className="custom-file-upload">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>

          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onInput={(event) => fileHandler(event)}
            style={{ padding: "10px" }}
          />
        </label>
      </div>
      <span>{fileName}</span>

      <div style={{ padding: 8 }}>
            <Button
              type={"primary"}
              onClick={() => {
                // state.rows.map((data, i) => console.log(data[1]))
                // tx(
                //   writeContracts.YourToken.transfer(tokenSendToAddress, ethers.utils.parseEther("" + tokenSendAmount)),
                // );
              }}
            >
              Send Tokens
            </Button>
          </div>

      <Row>
        <Col span={12} className="">
          {"Address"}
          {state.rows
            ? state.rows.map((data, i) => <p key={i}>{data[1]}</p>)
            : null}
        </Col>
        <Col span={12} className="">
          {"Amount"}
          {state.rows
            ? state.rows.map((data, i) => <p key={i}>{data[2]}</p>)
            : null}
        </Col>
      </Row>
    </>
  );
};

export default UploadTokens;
