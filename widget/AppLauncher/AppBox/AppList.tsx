import { Gtk } from "ags/gtk4";
import AstalApps from "gi://AstalApps?version=0.1"
import { Accessor, For } from "gnim";

export default function AppList({applications}: Props): JSX.Element{
    return (
        <box orientation={Gtk.Orientation.VERTICAL}>
            <For each={applications}>
                {(app => (
                    <button>
                        <box>
                            <image iconName={app.iconName}/>
                            <label label={app.name} />
                        </box>
                    </button>
                ))} 
            </For>
        </box>
    )
}

type Props = {
    applications: Accessor<AstalApps.Application[]>,
}