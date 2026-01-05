import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createEffect, createState, State } from "gnim"
import { Search } from "./AppLauncher/AppBox/Search";
import AstalApps from "gi://AstalApps?version=0.1";
import AppList from "./AppLauncher/AppBox/AppList";
import Graphene from "gi://Graphene?version=1.0";
import { getKey } from "../utils";

export default function AppLauncher({gdkmonitor, visible = true}: Props): JSX.Element{
    const astalApp: AstalApps.Apps = new AstalApps.Apps();

    const [textVal, setTextVal] = createState("");
    const [applications, setApplications]: State<AstalApps.Application[]> = createState(new Array<AstalApps.Application>());

    createEffect(() => {
        const foundApplications: AstalApps.Application[] = astalApp.exact_query(textVal());
        
        setApplications(() => {
            return [...foundApplications];
        });
    })

    const [appWindow, setAppWindow] = createState(new Gtk.Window);
    const [searchEntry, setSearchEntry] = createState(new Gtk.Entry);
    const [appBox, setAppBox] = createState(new Gtk.Box);

    return (
        <window
        class="AppLauncher"
        $={(ref) => setAppWindow(ref)}
        visible={visible}
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.EXCLUSIVE}
        gdkmonitor={gdkmonitor}>
            <Gtk.EventControllerKey onKeyPressed={(_e, keyVal, _, mod) => onKey(keyVal, mod, appWindow(), searchEntry(), applications())}/>
            <Gtk.GestureClick onPressed={(_e, _, x, y) => handleClick(x, y, appBox(), appWindow())} />
            <box 
            $={(ref) => setAppBox(ref)}
            orientation={Gtk.Orientation.VERTICAL}
            class="app-box">
                <Search setEntry={setSearchEntry} setTextVal={setTextVal}/>
                <AppList applications={applications} appWindow={appWindow()}/>
            </box>
        </window>
    )
}

/**
 * Handles key events for the application launcher
 * @param keyVal The number of the key pressed 
 * @param mod Modifier key
 * @param appWindow The Gtk.Window of the AppLauncher
 * @param searchEntry The Gtk.Entry of the search entry for the AppList
 * @param applications The array of applications
 */
function onKey(keyVal: number, mod: Gdk.ModifierType, appWindow: Gtk.Window, searchEntry: Gtk.Entry,
    applications: Array<AstalApps.Application>
): void{
    if(keyVal == Gdk.KEY_Escape){
        appWindow.visible = false;
        return;
    }
    
    const textStr: string = getKey(keyVal);
    const currText: string = searchEntry.text;

    // used with backspace
    const controlUsed: boolean = mod == 4;

    if(textStr.length == 1){
        searchEntry.set_text(currText + textStr);

    }else if(textStr.includes("backspace")){
        if(controlUsed){
            searchEntry.set_text("");
        }else{
            if(currText.length != 0){
                searchEntry.set_text(currText.slice(0, currText.length - 1));
            }
        }

    }else if(textStr.includes("return")){
        if(applications.length != 0){
            if(applications[0].launch()){
                appWindow.hide();
            }
        }
    }
}

function handleClick(x: number, y: number, appBox: Gtk.Box, appWindow: Gtk.Window){
    const [, rect] = appBox.compute_bounds(appWindow);
    const pos = new Graphene.Point({x, y});

    if(!rect.contains_point(pos)){
        appWindow.hide();
    }
}

type Props = {
    gdkmonitor: Gdk.Monitor,
    visible?: boolean,
}