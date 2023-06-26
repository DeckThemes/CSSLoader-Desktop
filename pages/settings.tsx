import { AlertDialog, LabelledInput, Tooltip } from "@components/Primitives";
import {
  copyBackend,
  getBackendVersion,
  getStandaloneVersion,
  killBackend,
  startBackend,
  storeRead,
  storeWrite,
  toast,
} from "backend";
import { useState, useEffect, useContext } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { FaPatreon } from "react-icons/fa";
import { themeContext } from "@contexts/themeContext";
import { GenericInstallBackendModal } from "@components/GenericInstallBackendModal";
import { open } from "@tauri-apps/api/dialog";

export default function SettingsPage() {
  const [token, setToken] = useState<string>("");
  function onSaveToken() {
    storeWrite("shortToken", token).then(() => {
      toast("Token Saved");
    });
  }
  useEffect(() => {
    storeRead("shortToken").then((res) => {
      if (res.success && res.result) {
        setToken(res.result);
      }
    });
  }, []);

  const { themes, refreshThemes } = useContext(themeContext);

  const [showBackendInstallModal, setShowBackendInstallModal] = useState<boolean>(false);
  const [installText, setInstallText] = useState<string>("");
  const [installModalDesc, setInstallModalDesc] = useState<string>("");

  return (
    <>
      <main className="flex w-full flex-1 flex-grow flex-col items-center gap-4">
        <div className="flex w-full max-w-[960px] flex-col gap-8 px-4 pt-12">
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Store Settings</span>
            <div className="flex items-end justify-center gap-4">
              <LabelledInput
                password
                label={
                  <div className="flex items-center gap-2">
                    <span>DeckThemes Token</span>
                    <Tooltip
                      triggerContent={<AiOutlineQuestionCircle size={18} />}
                      content={
                        <span className="text-sm">
                          A token enables you to star themes in the store.
                          <br />
                          You can create a token through your account page on{" "}
                          <span
                            className="cursor-pointer text-fore-9-dark"
                            onClick={async () => {
                              const { open } = await import("@tauri-apps/api/shell");
                              open("https://deckthemes.com");
                            }}
                          >
                            deckthemes.com
                          </span>
                        </span>
                      }
                    />
                  </div>
                }
                value={token}
                onValueChange={setToken}
              />
              <button
                onClick={onSaveToken}
                className="h-12 whitespace-nowrap rounded-xl bg-brandBlue px-4"
              >
                Save Token
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Developer Settings</span>
            <button
              onClick={() => killBackend(() => console.log("Backend Killed"))}
              className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
            >
              Kill Backend
            </button>
            <button
              onClick={() => startBackend(() => console.log("Backend Started"))}
              className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
            >
              Force Start Backend
            </button>
            <AlertDialog
              cancelText="Go Back"
              title="Wait A Second!"
              description="This feature is meant for developers. If you do not understand exactly what you're doing, cancel this popup. Do not install files from untrusted sources."
              actionText="I Know What I'm Doing"
              actionClass="bg-dangerRed"
              onAction={() => {
                open({
                  directory: false,
                  multiple: false,
                  filters: [
                    {
                      name: "CSSLoader-Standalone-Headless.exe",
                      extensions: ["exe"],
                    },
                  ],
                  //  @ts-ignore
                }).then((path: string) => {
                  setInstallModalDesc("Installing " + path.slice(path.lastIndexOf("\\") + 1));
                  // TODO: This function assumes each function never fails, add some failsafes/error messages
                  setShowBackendInstallModal(true);
                  setInstallText("Stopping Backend");
                  killBackend(() => {
                    setTimeout(() => {
                      setInstallText("Installing New Backend");
                      copyBackend(path, () => {
                        setTimeout(() => {
                          // TODO: THIS IS HORRIBLY JANK!
                          // For some reason, it appears the first time you start the new backend, it always fails, it is only after it fails once that it then starts the next time
                          setInstallText("Pausing To Allow Windows To Figure Itself Out");
                          startBackend(() => {});
                          setTimeout(() => {
                            startBackend(() => {
                              setTimeout(() => {
                                setShowBackendInstallModal(false);
                                setInstallModalDesc("");
                                refreshThemes();
                              }, 1000);
                            });
                          }, 10000);
                        }, 1000);
                      });
                    }, 1000);
                  });
                });
              }}
              Trigger={
                <>
                  <button className="h-12 w-full whitespace-nowrap rounded-xl bg-base-3-dark px-4">
                    Install Backend From File
                  </button>
                </>
              }
            />

            {showBackendInstallModal && (
              <GenericInstallBackendModal
                titleText="Installed Backend From File"
                descriptionText={installModalDesc}
                installProg={1}
                installText={installText}
                dontClose
              />
            )}

            <button
              onClick={async () => {
                console.log("Themes", themes);
                console.log(
                  "Highest Support Manifest Version",
                  await getBackendVersion().then((res) => res.result)
                );
                console.log("AppData's Stored Standalone Version", await getStandaloneVersion());
              }}
              className="h-12 whitespace-nowrap rounded-xl bg-base-3-dark px-4"
            >
              Data Dump
            </button>
          </div>
          <div className="flex w-full flex-col gap-4">
            <span className="text-lg font-bold">Credits</span>
            <ul>
              <li>SuchMemeManySkill - Backend Dev</li>
              <li>Beebles - Frontend Dev</li>
              <li>Fero - Frontend Dev</li>
            </ul>
            <div className="flex w-full flex-col items-start pb-8">
              <button
                className="flex items-center justify-center gap-4 text-discordColor"
                onClick={async () => {
                  const { open } = await import("@tauri-apps/api/shell");
                  await open("https://deckthemes.com/discord");
                }}
              >
                <BsDiscord />
                <span>Join The Community</span>
              </button>
              <button
                className="flex items-center justify-center gap-4 text-patreonColor"
                onClick={async () => {
                  const { open } = await import("@tauri-apps/api/shell");
                  await open("https://patreon.com/deckthemes");
                }}
              >
                <FaPatreon />
                <span>Support Us</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
