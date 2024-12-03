import React from "react";
import ImageServ from "../assets/left-service.jpg";
import Vac from "../assets/vac.jpg";
import Deworm from "../assets/deworm1.png";
import Groom from "../assets/groom.jpg";
import Surgery from "../assets/surg1.png";
import Consult from "../assets/consult.jpg";
import Treat from "../assets/treat.png";
import Confine from "../assets/confine1.jpg";
import PetBoard from "../assets/pet-boarding.jpg";
import Lab from "../assets/lab1.jpg";
import "./UserService.css";

function UserService() {
  return (
    <div className="user-ser-main-com">
      <div className="user-ser-left">
        <p>SERVICES OFFERED</p>
      </div>
      <div className="user-ser-right">
        <img src={ImageServ} alt="ImageServ" />
      </div>
      <div className="user-ser-buttom">
        <div className="user-ser-buttom-top">
          <div className="user-ser-buttom-cards">
            <img src={Vac} alt="Vac" />
            <p>Vaccination</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={Deworm} alt="Deworm" />
            <p>Deworming</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={Groom} alt="Groom" />
            <p>Grooming</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={Surgery} alt="Surgery" />
            <p>Surgery</p>
          </div>
        </div>
        <div className="user-ser-buttom-buttom">
          <div className="user-ser-buttom-cards">
            <img src={Consult} alt="Consult" />
            <p>Consultation</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={Treat} alt="Treat" />
            <p>Treatment</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={Confine} alt="Confine" />
            <p>Confinement</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={PetBoard} alt="PetBoard" />
            <p>Pet Boarding</p>
          </div>
          <div className="user-ser-buttom-cards">
            <img src={Lab} alt="Lab" />
            <p>Laboratory</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserService;
