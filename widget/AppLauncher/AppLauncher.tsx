import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createEffect, createState, For, State } from "gnim"
import { Search } from "./AppBox/Search";
import AstalApps from "gi://AstalApps?version=0.1";
import AppList from "./AppBox/AppList";

export default function AppLauncher({gdkmonitor, visible = true}: Props): JSX.Element{
    const astalApp: AstalApps.Apps = new AstalApps.Apps();

    const [textVal, setTextVal] = createState("");
    const [applications, setApplications]: State<AstalApps.Application[]> = createState(new Array<AstalApps.Application>());

    createEffect(() => {
        if(textVal() != ""){
            const foundApplications: AstalApps.Application[] = astalApp.exact_query(textVal());

            setApplications(() => {
                if(foundApplications.length > 8){
                    return [...foundApplications].slice(0, 8);
                }
                
                return [...foundApplications];
            });
        }else{
            // if it is empty then don't display anything
            setApplications([]);
        }
    })


    let searchEntry: Gtk.Entry | undefined = undefined;
    let appWindow: Gtk.Window;

    return (
        <window
        class="AppLauncher"
        $={(ref) => (appWindow = ref)}
        visible={visible}
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.EXCLUSIVE}
        gdkmonitor={gdkmonitor}>
            <Gtk.EventControllerKey onKeyPressed={(_e, keyVal, _, _mod) => onKey(keyVal, appWindow)}/>
            <Gtk.GestureClick onPressed={(_e, _, x, y) => {console.log(x, y)}} />
            <box 
            orientation={Gtk.Orientation.VERTICAL}
            class="app-box">
                <Search setTextVal={setTextVal} searchEntry={searchEntry}/>
                <AppList applications={applications} />
            </box>
        </window>
    )
}

function onKey(keyVal: number, appWindow: Gtk.Window): void{
    if(keyVal == Gdk.KEY_Escape){
        appWindow.visible = false;
        return;
    }
}

type Props = {
    gdkmonitor: Gdk.Monitor,
    visible?: boolean,
}