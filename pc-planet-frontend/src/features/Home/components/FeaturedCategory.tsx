import React from "react";
import { SlScreenSmartphone } from "react-icons/sl";
import { IoIosLaptop } from "react-icons/io";
import { GrServices } from "react-icons/gr";
import {
  PiDesktopTower,
  PiGraphicsCardLight,
  PiMonitorThin,
  PiOfficeChairLight,
} from "react-icons/pi";
import { GiProcessor } from "react-icons/gi";
import { BsDeviceSsd, BsMotherboard, BsRouter } from "react-icons/bs";
import { CiKeyboard, CiSpeaker } from "react-icons/ci";
import { CgSmartphoneRam } from "react-icons/cg";
import { LuPcCase } from "react-icons/lu";
import { IoWatchOutline } from "react-icons/io5";

const FeaturedCategory = () => {
  return (
    <>
      <div className="text-center">
        <h5>Featured Category</h5>
        <span>Get Your Desired Product from Featured Category!</span>
      </div>
      <div className="d-flex flex-column gap-3 mt-2">
        <div className="d-flex flex-xl-row flex-column gap-3">
          <div className="d-flex flex-md-row flex-column gap-3 w-100">
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <SlScreenSmartphone size={50} />
                <span>Smartphone</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <IoIosLaptop size={50} />
                <span>Laptop</span>
              </div>
            </div>
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <GrServices size={50} />
                <span>Servicing</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <PiDesktopTower size={50} />
                <span>Servicing</span>
              </div>
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column gap-3 w-100">
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <GiProcessor size={50} />
                <span>Processor</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <BsMotherboard size={50} />
                <span>Motherboard</span>
              </div>
            </div>
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <BsDeviceSsd size={50} />
                <span>SSD</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <PiGraphicsCardLight size={50} />
                <span>Graphics card</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-xl-row flex-column gap-3">
          <div className="d-flex flex-md-row flex-column gap-3 w-100">
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <CiKeyboard size={50} />
                <span>Keyboard</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <CgSmartphoneRam size={50} />
                <span>RAM</span>
              </div>
            </div>
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <PiMonitorThin size={50} />
                <span>Monitor</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <PiOfficeChairLight size={50} />
                <span>Gaming Chair</span>
              </div>
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column gap-3 w-100">
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <LuPcCase size={50} />
                <span>Case</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <IoWatchOutline size={50} />
                <span>Smart Watch</span>
              </div>
            </div>
            <div className="d-flex w-100 gap-3">
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <BsRouter size={50} />
                <span>Router</span>
              </div>
              <div className="d-flex flex-column bg-white p-4 align-items-center rounded-4 w-100">
                <CiSpeaker size={50} />
                <span>Speaker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCategory;
