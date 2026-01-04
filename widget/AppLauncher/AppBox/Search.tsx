import { Gtk } from "ags/gtk4";
import { Setter } from "gnim";

export function Search({searchEntry = undefined, setTextVal}: Props): JSX.Element{
    return (
        <box>
            <entry
            $={ref => (searchEntry = ref)}
            onNotifyText={({ text }) => setTextVal(text)}
            class="app-search" />
        </box>
    )
}

type Props = {
    searchEntry?: Gtk.Entry,
    setTextVal: Setter<string>,
}