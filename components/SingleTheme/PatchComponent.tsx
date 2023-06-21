import { VFC } from "react";

import { open } from "@tauri-apps/api/dialog";
import { ThemePatchComponent } from "../../ThemeTypes";
import { FaFolder } from "react-icons/fa";
import { fetchThemePath, getInstalledThemes, setComponentOfThemePatch, toast } from "../../backend";

export const PatchComponent = ({
  data,
  selectedLabel,
  themeName,
  patchName,
  bottomSeparatorValue,
}: {
  data: ThemePatchComponent;
  selectedLabel: string;
  themeName: string;
  patchName: string;
  bottomSeparatorValue: any;
}) => {
  function setComponentAndReload(value: string) {
    setComponentOfThemePatch(
      themeName,
      patchName,
      data.name, // componentName
      value
    ).then(() => {
      getInstalledThemes();
    });
  }
  if (selectedLabel === data.on) {
    // The only value that changes from component to component is the value, so this can just be re-used
    switch (data.type) {
      case "image-picker":
        // This makes things compatible with people using HoloISO or who don't have the user /deck/
        // These have to
        return (
          <div className="w-full pr-4">
            <button
              className="flex w-full items-center justify-between"
              onClick={() =>
                fetchThemePath()
                  .then((res) => {
                    return res.result;
                  })
                  .then((rootPath: string) => {
                    open({
                      directory: false,
                      multiple: false,
                      filters: [
                        {
                          name: "Image File",
                          extensions: ["svg", "png", "jpg", "jpeg", "avif", "webp", "gif"],
                        },
                      ],
                      defaultPath: rootPath,
                    }).then((path) => {
                      if (!path) {
                        toast("Error!", "No File Selected");
                        return;
                      }
                      if (typeof path === "string") {
                        if (!path?.includes(rootPath)) {
                          toast("Invalid File", "Images must be within themes folder");
                          return;
                        }
                        if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(path)) {
                          toast("Invalid File", "Must be an image file");
                          return;
                        }
                        const relativePath = path.split(`${rootPath}`)[1].slice(1);
                        console.log(relativePath);
                        setComponentAndReload(relativePath);
                      }
                    });
                  })
              }
            >
              <span>{data.name}</span>
              <div
                style={{
                  marginLeft: "auto",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaFolder />
              </div>
            </button>
          </div>
        );
      case "color-picker":
        return (
          <>
            <div className="flex w-full items-center justify-between">
              <span>{data.name}</span>
              <input
                className="my-4 overflow-hidden rounded-full"
                type="color"
                defaultValue={data.value}
                onBlur={(e) => {
                  setComponentAndReload(e.target.value);
                }}
              />
            </div>
          </>
        );
    }
  }
  return null;
};
