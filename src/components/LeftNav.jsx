import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextApi";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "./../utils/Constatnts";
import { useContext } from "react";
import { GiUpgrade } from "react-icons/gi";

const LeftNav = () => {
  const { selectCategorie, setSelectCategorie, mobileMenu } =
    useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategorie(name);
      case "home":
        return setSelectCategorie(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={` md:block w-[240px] overflow-y-auto h-full py-4 bg-white absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
          mobileMenu ? "translate-x-0" : ""
        } `}
      >
        <div className="flex px-5 flex-col ">
          {categories.map((item) => {
            return (
              <React.Fragment key={item.name}>
                <LeftNavMenuItem
                  text={item.type === "home" ? "Home" : item.name}
                  icon={item.icon}
                  action={() => {
                    clickHandler(item.name, item.type);
                    navigate("/");
                  }}
                  className={`${
                    selectCategorie === item.name ? "bg-black/[0.15]" : ""
                  }`}
                />
                {item.divider && <hr className="my-5 border-black/[0.2]" />}
              </React.Fragment>
            );
          })}
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={() => {
              navigate("/premium");
            }}
          >
            <GiUpgrade className="mr-2 text-2xl text-gray-600" />
            <img
              src="https://www.gstatic.com/youtube/img/promos/growth/ytr_lp2_logo_premium_desktop_552x71.png"
              alt="premium"
              className="h-6 w-auto"
            />
          </div>
          <hr className="my-5 border-black/[0.2]" />

          <div className="text-black/ text-[12px] ">
            clone By :Omkar chebale
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftNav;
