import { VFC } from "react";

import { open } from "@tauri-apps/api/dialog";

import * as python from "../backend";
import { ThemePatchComponent } from "../ThemeTypes";
import { FaFolder } from "react-icons/fa";

export const PatchComponent: VFC<{
  data: ThemePatchComponent;
  selectedLabel: string;
  themeName: string;
  patchName: string;
  bottomSeparatorValue: "standard" | "none";
}> = ({ data, selectedLabel, themeName, patchName, bottomSeparatorValue }) => {
  function setComponentAndReload(value: string) {
    python.resolve(
      python.setComponentOfThemePatch(
        themeName,
        patchName,
        data.name, // componentName
        value
      ),
      () => {
        python.getInstalledThemes();
      }
    );
  }
  if (selectedLabel === data.on) {
    // The only value that changes from component to component is the value, so this can just be re-used
    switch (data.type) {
      case "image-picker":
        // This makes things compatible with people using HoloISO or who don't have the user /deck/
        // These have to
        async function pickImage(rootPath: string) {
          const res = await python.openFilePicker(rootPath);
          if (!res.path.includes(rootPath)) {
            python.toast("Invalid File", "Images must be within themes folder");
            return;
          }
          if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(res.path)) {
            python.toast("Invalid File", "Must be an image file");
            return;
          }
          const relativePath = res.path.split(`${rootPath}/`)[1];
          setComponentAndReload(relativePath);
        }
        return (
          <div>
            <button
              onClick={() =>
                python.resolve(python.fetchThemePath(), (rootPath: string) => {
                  open({
                    directory: false,
                    multiple: false,
                    filters: [
                      {
                        name: "Image File",
                        extensions: [
                          "svg",
                          "png",
                          "jpg",
                          "jpeg",
                          "avif",
                          "webp",
                          "gif",
                        ],
                      },
                    ],
                    defaultPath: rootPath,
                  }).then((path) => {
                    if (!path) {
                      python.toast("Error!", "No File Selected");
                      return;
                    }
                    if (typeof path === "string") {
                      if (!path?.includes(rootPath)) {
                        python.toast(
                          "Invalid File",
                          "Images must be within themes folder"
                        );
                        return;
                      }
                      if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(path)) {
                        python.toast("Invalid File", "Must be an image file");
                        return;
                      }
                      console.log(path, rootPath);
                      const relativePath = path
                        .split(`${rootPath}`)[1]
                        .slice(1);
                      setComponentAndReload(relativePath);
                    }
                  });
                })
              }>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Open {data.name}</span>
                <div
                  style={{
                    marginLeft: "auto",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <FaFolder />
                </div>
              </div>
            </button>
          </div>
        );
      case "color-picker":
        return (
          <>
            <div className='flex gap-2'>
              <span>{data.name}</span>
              <input
                type='color'
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
