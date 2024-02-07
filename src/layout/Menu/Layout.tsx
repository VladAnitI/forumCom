import cn from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Layout.module.css";
import { useState, ChangeEvent } from "react";
import { IoClose } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineDone } from "react-icons/md";
// import Search from '../../components/Search/Search'
// import { LuSearch } from 'react-icons/lu'

export function Layout() {
  const [changeAvaOrNick, setChangeAvaOrNick] = useState<string>("");
  let funcChangeAvaOrNick = (typeOfChange: string) => {
    setChangeAvaOrNick(typeOfChange);
  };

  const fileTypes: string[] = ["JPG", "PNG", "JPEG"];
  const [choosenFile, setChoosenFile] = useState<File | null>(null);
  const handleChange = (file: File):void => {
    setChoosenFile(file);
  };

  const [nick, setNick] = useState<string>("");
  const handleNickChange = (event: ChangeEvent<HTMLInputElement>):void => {
    const value = event.target.value;
    setNick(value);
  };

  const handleCompleteChange = ():void => {
    if (changeAvaOrNick == "avatar") {
      if (choosenFile !== null) {
        setChangeAvaOrNick("");
      } else {
        alert("please choose an image");
      }
    }
    if(changeAvaOrNick == "nickname"){
      if (nick!== "") {
        setChangeAvaOrNick("");
      } else {
        alert("please enter a nickname");
      }
    }
  };
  return (
    <div className={cn(styles["layout"])}>
      <div className={cn(styles["menu"])}>
        <div className={cn(styles["logo-and-name"])}>
          <img src="/logo.png" className={cn(styles["logo"])}></img>
          <p className={cn(styles["name"])}>forum</p>
        </div>
        {/* <div className={cn(styles['user'])}>
					<div className={cn(styles['search'])}>
					<div className={cn(styles['search-container'])}>
						<LuSearch className={cn(styles['search-icon'])} />
						<Search placeholder='type to search...' />
					</div>
					</div>
				</div>  */}
        <div className={cn(styles["navigation"])}>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              cn(styles["link"], { [styles.active]: isActive })
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/newpage"
            className={({ isActive }) =>
              cn(styles["link"], { [styles.active]: isActive })
            }
          >
            New category
          </NavLink>

          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              cn(styles["link"], { [styles.active]: isActive })
            }
          >
            Statistics
          </NavLink>
        </div>
        <div className={cn(styles["accBlock"])}>
          <div className={cn(styles["infoBlock"])}>
            <div className={cn(styles["avaBlock"])}>
              <img
                src="https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg"
                alt="avatar"
                className={cn(styles["avaImg"])}
                onClick={() => {
                  funcChangeAvaOrNick("avatar");
                }}
              />
            </div>
            <div className={cn(styles["nickBlock"])}>
              <div
                className={cn(styles["nickname"])}
                onClick={() => {
                  funcChangeAvaOrNick("nickname");
                }}
              >
                fafafa
              </div>
              <div className={cn(styles["email"])}>fafafa@gmail.com</div>
            </div>
          </div>
          <div className={cn(styles["logoutBlock"])}>
            <Button className={cn(styles["logout"])}>Logout</Button>
          </div>
        </div>
      </div>
      {changeAvaOrNick == "avatar" ? (
        <div className={cn(styles["containerChange"])}>
          <IoClose
            className={cn(styles["cancelChange"])}
            onClick={() => {
              funcChangeAvaOrNick("");
            }}
          />
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={false}
            children={
              <>
                <div className={cn(styles["input-file"])}>
                  <span>
                    Drop
                    <br />
                    or
                    <br />
                    choose
                    <br />
                    image
                  </span>
                  {choosenFile ? (
                    <div className={cn(styles["circleChoose"])}>
                      <MdOutlineDone className={cn(styles["done"])} />
                    </div>
                  ) : null}
                </div>
              </>
            }
          />
          <div className={cn(styles["buttonSubmit"])} onClick={()=>{handleCompleteChange()}}>Submit</div>
        </div>
      ) : (
        <></>
      )}
      {changeAvaOrNick == "nickname" ? (
        <div className={cn(styles["containerChange"])}>
          <IoClose
            className={cn(styles["cancelChange"])}
            onClick={() => {
              funcChangeAvaOrNick("");
            }}
          />
          <input
            type="text"
            className={cn(styles["input-text"])}
            value={nick}
            onChange={handleNickChange}
            placeholder="New nickname"
          ></input>
          <div className={cn(styles["buttonSubmit"])} onClick={() => {handleCompleteChange()}}>
            Submit
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={cn(styles["content"])}>
        <Outlet />
      </div>
    </div>
  );
}
