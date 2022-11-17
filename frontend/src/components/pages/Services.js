import React, { useState } from "react";
import { post_place } from "restapi/places";
import "../../App.css";
import ServicesMap from "../geolocation/ServicesMap";
import "../../assets/Services.css";

export default function Services() {
  const [placename, setPlaceName] = useState(""); // 장소명
  const [employee, setEmployee] = useState(0); // 종업원 수
  const [maximumpeople, setMaximumPeople] = useState(0); // 최대 인원 제한 수
  const [latitude, setLatitude] = useState(35.15772848796884);
  const [longitude, setLongitude] = useState(129.05912439551273);
  const [disabled, setDisabled] = useState(false);
  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    if (placename.length < 1) {
      alert("1자의 이상의 장소명을 입력하셔야 합니다.");
    } else if (!employee) {
      alert("종업원 수를 입력하셔야 합니다.");
    } else if (!maximumpeople) {
      alert("최대 제한 인원을 설정하세요.");
    } else {
      alert(`입력된 장소명: ${placename}`);
    }
    setDisabled(false);
  };
  return (
    <div className="service-mainpage">
      <div className="service-mainpage__h1">
        <h1>Register your place to trace congestion</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          업체명 :{" "}
          <input
            type="text"
            name="placename"
            value={placename}
            onChange={(e) => {
              setPlaceName(e.target.value);
            }}
            placeholder="장소명을 입력하세요."
          />
          종업원 수 :{" "}
          <input
            type="number"
            name="employee"
            value={employee}
            onChange={(e) => {
              setEmployee(e.target.value);
            }}
          ></input>
        </div>
        <div>
          최대제한 인원 수 :{" "}
          <input
            type="number"
            name="maximumpeople"
            value={maximumpeople}
            onChange={(e) => {
              setMaximumPeople(e.target.value);
            }}
          ></input>
        </div>
        <div>
          위도 :
          <input
            type="number"
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
            placeholder="Latitude"
            value={latitude}
          />
          경도 :
          <input
            type="number"
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
            placeholder="Longitude"
            value={longitude}
          />
        </div>
        <button
          type="submit"
          disabled={disabled}
          onClick={(e) => {
            post_place({
              Name: placename,
              Employees: employee,
              CrowdThreshold: maximumpeople,
              Latitude: latitude,
              Longitude: longitude,
            });
          }}
        >
          장소 등록
        </button>
        <button type="submit">취소</button>
      </form>

      <div className="service-mainpage__map">
        <ServicesMap
          setLatLng={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />
      </div>
    </div>
  );
}
